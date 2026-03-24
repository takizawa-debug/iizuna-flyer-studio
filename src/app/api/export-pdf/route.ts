import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 120;

async function getBrowser() {
    if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
        // Serverless: use @sparticuz/chromium (full) + puppeteer-core
        const chromium = await import('@sparticuz/chromium');
        const puppeteerCore = await import('puppeteer-core');

        return puppeteerCore.default.launch({
            args: chromium.default.args,
            defaultViewport: null,
            executablePath: await chromium.default.executablePath(),
            headless: true,
        });
    } else {
        // Local: use regular puppeteer
        const puppeteer = await import('puppeteer');
        return puppeteer.default.launch({
            headless: true,
            defaultViewport: null,
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

        // Set viewport to match panel width for accurate print layout
        // 840px = panel width; print CSS scales it to A4 (297mm)
        await page.setViewport({
            width: 840,
            height: 594,
            deviceScaleFactor: 1,
        });

        await page.goto(pageUrl, {
            waitUntil: 'networkidle2',
            timeout: 90000,
        });

        // Wait for fonts and images
        await page.evaluate(() => document.fonts.ready);
        await new Promise(r => setTimeout(r, 5000));

        // Apply print mode: hide UI, flatten layout for exact A4 fit
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
            // Hide section labels (h2 with print:hidden)
            document.querySelectorAll('h2').forEach(h => {
                (h as HTMLElement).style.display = 'none';
            });

            // Strip ALL padding/margin/gap from wrapper chain
            const outerContainer = document.querySelector('.overflow-auto') as HTMLElement;
            if (outerContainer) {
                outerContainer.style.padding = '0';
                outerContainer.style.margin = '0';
                outerContainer.style.overflow = 'visible';
            }

            // Reset scale wrapper
            const scaleContainer = document.querySelector('[style*="scale"]') as HTMLElement;
            if (scaleContainer) {
                scaleContainer.style.transform = 'none';
                scaleContainer.style.gap = '0';
                scaleContainer.style.padding = '0';
                scaleContainer.style.margin = '0';
                scaleContainer.style.minHeight = 'auto';
            }

            // Section wrappers (front/back groups): strip all spacing
            const sectionWrappers = scaleContainer?.children;
            if (sectionWrappers) {
                for (let i = 0; i < sectionWrappers.length; i++) {
                    const wrapper = sectionWrappers[i] as HTMLElement;
                    wrapper.style.gap = '0';
                    wrapper.style.padding = '0';
                    wrapper.style.margin = '0';
                    wrapper.style.display = 'block';
                    wrapper.style.width = '297mm';
                    wrapper.style.height = '210mm';
                    wrapper.style.overflow = 'hidden';
                    wrapper.style.pageBreakAfter = i < sectionWrappers.length - 1 ? 'always' : 'auto';
                }
            }

            // Force top-level wrapper to block and no spacing
            const ptWrapper = document.querySelector('.pt-\\[56px\\]') as HTMLElement;
            if (ptWrapper) {
                ptWrapper.style.padding = '0';
                ptWrapper.style.margin = '0';
            }
        });

        await new Promise(r => setTimeout(r, 1000));

        // Generate PDF using Chromium's built-in PDF engine
        // This produces vector text with embedded fonts
        const pdfBuffer = await page.pdf({
            width: '297mm',
            height: '210mm',
            printBackground: true,
            preferCSSPageSize: false,
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
