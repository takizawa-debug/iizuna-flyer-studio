import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 120;

async function getBrowser() {
    if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
        // Serverless: use @sparticuz/chromium (full) + puppeteer-core
        const chromium = await import('@sparticuz/chromium');
        const puppeteerCore = await import('puppeteer-core');

        return puppeteerCore.default.launch({
            args: chromium.default.args,
            defaultViewport: { width: 1200, height: 2400, deviceScaleFactor: 5 },
            executablePath: await chromium.default.executablePath(),
            headless: true,
        });
    } else {
        // Local: use regular puppeteer
        const puppeteer = await import('puppeteer');
        return puppeteer.default.launch({
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

        await page.setViewport({
            width: 1200,
            height: 2400,
            deviceScaleFactor: 5,
        });

        await page.goto(pageUrl, {
            waitUntil: 'networkidle2',
            timeout: 90000,
        });

        // Wait for fonts and images
        await page.evaluate(() => document.fonts.ready);
        await new Promise(r => setTimeout(r, 5000));

        // Apply print mode: hide UI, reset scale, remove filters
        await page.evaluate(() => {
            document.body.classList.add('is-printing');

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

        // Generate PDF using Chromium's built-in PDF engine
        // This produces vector text with embedded fonts
        const pdfBuffer = await page.pdf({
            format: 'A4',
            landscape: true,
            printBackground: true,
            preferCSSPageSize: true,
            margin: { top: '0', right: '0', bottom: '0', left: '0' },
        });

        return new NextResponse(Buffer.from(pdfBuffer), {
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
