import { NextRequest, NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';

export const maxDuration = 120;

// Trim mark (トンボ) helper — draws crop marks at each corner
function drawTrimMarks(pdf: jsPDF, bleed: number, contentW: number, contentH: number) {
    const markLen = 8; // mm length of each mark line
    const markOffset = 1; // mm gap between content edge and mark start
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.25);

    // Corner positions (content edges within the bleed)
    const x1 = bleed;
    const y1 = bleed;
    const x2 = bleed + contentW;
    const y2 = bleed + contentH;

    // Top-Left
    pdf.line(x1 - markOffset, y1, x1 - markOffset - markLen, y1); // horizontal left
    pdf.line(x1, y1 - markOffset, x1, y1 - markOffset - markLen); // vertical up

    // Top-Right
    pdf.line(x2 + markOffset, y1, x2 + markOffset + markLen, y1);
    pdf.line(x2, y1 - markOffset, x2, y1 - markOffset - markLen);

    // Bottom-Left
    pdf.line(x1 - markOffset, y2, x1 - markOffset - markLen, y2);
    pdf.line(x1, y2 + markOffset, x1, y2 + markOffset + markLen);

    // Bottom-Right
    pdf.line(x2 + markOffset, y2, x2 + markOffset + markLen, y2);
    pdf.line(x2, y2 + markOffset, x2, y2 + markOffset + markLen);
}

async function getBrowser() {
    const isVercel = !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME;

    if (isVercel) {
        // Serverless environment — use @sparticuz/chromium-min + puppeteer-core
        const chromium = (await import('@sparticuz/chromium-min')).default;
        const puppeteerCore = (await import('puppeteer-core')).default;

        const executablePath = await chromium.executablePath(
            'https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.x64.tar'
        );

        return puppeteerCore.launch({
            args: chromium.args,
            defaultViewport: { width: 1200, height: 2400 },
            executablePath,
            headless: 'shell' as const,
        });
    } else {
        // Local development — use regular puppeteer with bundled Chromium
        const puppeteer = (await import('puppeteer')).default;
        return puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--font-render-hinting=none',
            ],
        });
    }
}

export async function GET(req: NextRequest) {
    let browser;
    try {
        const host = req.headers.get('host') || 'localhost:3000';
        const protocol = host.includes('localhost') ? 'http' : 'https';
        const color = req.nextUrl.searchParams.get('color') || '#E88C83';
        const lang = req.nextUrl.searchParams.get('lang') || 'ja';
        const pageUrl = `${protocol}://${host}?color=${encodeURIComponent(color)}&lang=${encodeURIComponent(lang)}`;

        browser = await getBrowser();

        const page = await browser.newPage();

        // Set viewport wider than panel to prevent clipping
        await page.setViewport({
            width: 1200,
            height: 2400,
            deviceScaleFactor: 5, // 5x = ~359 DPI for commercial print quality
        });

        await page.goto(pageUrl, {
            waitUntil: 'networkidle2',
            timeout: 90000,
        });

        // Wait for fonts and images
        await page.evaluate(() => document.fonts.ready);
        await new Promise(r => setTimeout(r, 5000));

        // Hide UI controls and set scale to 1
        await page.evaluate(() => {
            // Hide fixed header
            document.querySelectorAll('.fixed').forEach(el => {
                (el as HTMLElement).style.display = 'none';
            });

            // Hide elements marked for export hiding
            document.querySelectorAll('[data-export-hide]').forEach(el => {
                (el as HTMLElement).style.display = 'none';
            });

            // Hide section labels
            document.querySelectorAll('h2').forEach(h => {
                if (h.classList.contains('print:hidden')) {
                    (h as HTMLElement).style.display = 'none';
                }
            });

            // Reset scale
            const scaleContainer = document.querySelector('[style*="scale"]') as HTMLElement;
            if (scaleContainer) {
                scaleContainer.style.transform = 'scale(1)';
                scaleContainer.style.gap = '20px';
                scaleContainer.style.padding = '0';
            }
        });

        await new Promise(r => setTimeout(r, 1000));

        // Capture panels
        const frontPanel = await page.$('[data-panel="front"]');
        const frontScreenshot = frontPanel
            ? await frontPanel.screenshot({ type: 'png', omitBackground: false })
            : await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 840, height: 594 } });

        const backPanel = await page.$('[data-panel="back"]');
        const backScreenshot = backPanel
            ? await backPanel.screenshot({ type: 'png', omitBackground: false })
            : null;

        // PDF dimensions — A4 landscape, no bleed, no trim marks
        const contentW = 297;
        const contentH = 210;

        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [contentW, contentH],
            compress: true,
        });

        // Page 1 — Front (edge to edge)
        const frontBase64 = `data:image/png;base64,${Buffer.from(frontScreenshot).toString('base64')}`;
        pdf.addImage(frontBase64, 'PNG', 0, 0, contentW, contentH, undefined, 'FAST');

        // Page 2 — Back
        if (backScreenshot) {
            pdf.addPage([contentW, contentH], 'landscape');
            const backBase64 = `data:image/png;base64,${Buffer.from(backScreenshot).toString('base64')}`;
            pdf.addImage(backBase64, 'PNG', 0, 0, contentW, contentH, undefined, 'FAST');
        }

        const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));

        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="iizuna-apple-pamphlet.pdf"',
            },
        });
    } catch (err) {
        console.error('PDF export error:', err);
        return NextResponse.json(
            { error: 'PDF generation failed', details: String(err) },
            { status: 500 }
        );
    } finally {
        if (browser) await browser.close();
    }
}
