import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 120;

async function getBrowser() {
    if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
        const chromium = await import('@sparticuz/chromium');
        const puppeteerCore = await import('puppeteer-core');
        return puppeteerCore.default.launch({
            args: chromium.default.args,
            defaultViewport: null,
            executablePath: await chromium.default.executablePath(),
            headless: true,
        });
    } else {
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

        await page.setViewport({ width: 840, height: 594, deviceScaleFactor: 1 });

        await page.goto(pageUrl, {
            waitUntil: 'networkidle2',
            timeout: 90000,
        });

        // Wait for fonts and images
        await page.evaluate(() => document.fonts.ready);
        await new Promise(r => setTimeout(r, 5000));

        // Extract panels from the DOM and rebuild body with ONLY the panels,
        // each sized to exactly fill one A4 landscape page (297mm × 210mm).
        // This eliminates all wrapper chain margin/padding/gap issues.
        await page.evaluate(() => {
            const frontPanel = document.querySelector('[data-panel="front"]') as HTMLElement;
            const backPanel = document.querySelector('[data-panel="back"]') as HTMLElement;
            if (!frontPanel) return;

            // Clone panels to preserve content
            const frontClone = frontPanel.cloneNode(true) as HTMLElement;
            const backClone = backPanel ? backPanel.cloneNode(true) as HTMLElement : null;

            // Style each panel to fill exactly one A4 page
            const panelStyle = `
                display: flex !important;
                width: 297mm !important;
                height: 210mm !important;
                overflow: hidden !important;
                margin: 0 !important;
                padding: 0 !important;
                box-shadow: none !important;
                transform-origin: top left !important;
                transform: scale(calc(297 / 222.25)) !important;
            `;
            // 840px at 96dpi = 222.25mm. Scale factor = 297/222.25 = 1.3363
            frontClone.setAttribute('style', frontClone.getAttribute('style') + ';' + panelStyle);
            if (backClone) {
                backClone.setAttribute('style', backClone.getAttribute('style') + ';' + panelStyle);
            }

            // Remove filter from all images to prevent gray borders
            const removeFilters = (el: HTMLElement) => {
                el.querySelectorAll('img').forEach(img => {
                    (img as HTMLElement).style.filter = 'none';
                });
            };
            removeFilters(frontClone);
            if (backClone) removeFilters(backClone);

            // Clear body and inject only the panels
            document.body.innerHTML = '';
            document.body.style.cssText = 'margin:0 !important; padding:0 !important; background:white !important;';

            // Inject print-specific styles
            const style = document.createElement('style');
            style.textContent = `
                @page { size: 297mm 210mm; margin: 0; }
                html, body { margin: 0 !important; padding: 0 !important; }
                * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                .pdf-page { page-break-after: always; width: 297mm; height: 210mm; overflow: hidden; position: relative; }
                .pdf-page:last-child { page-break-after: auto; }
                .pdf-page [data-panel] {
                    width: 840px !important;
                    height: 594px !important;
                    transform: scale(1.3363) !important;
                    transform-origin: top left !important;
                    box-shadow: none !important;
                }
            `;
            document.head.appendChild(style);

            // Wrap each panel in a page container
            const frontPage = document.createElement('div');
            frontPage.className = 'pdf-page';
            // Reset the inline style we set above — let the CSS class handle sizing
            frontClone.style.cssText = '';
            frontPage.appendChild(frontClone);
            document.body.appendChild(frontPage);

            if (backClone) {
                const backPage = document.createElement('div');
                backPage.className = 'pdf-page';
                backClone.style.cssText = '';
                backPage.appendChild(backClone);
                document.body.appendChild(backPage);
            }
        });

        await new Promise(r => setTimeout(r, 1000));

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
