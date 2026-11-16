import puppeteer, { type Browser } from 'puppeteer-core';

/**
 * Renders a page of this site to an A4 PDF with headless Chrome.
 *
 * - On Vercel: @sparticuz/chromium (a Lambda-sized Chromium build).
 * - Locally: your installed Chrome (override with CHROME_EXECUTABLE_PATH).
 *
 * The page itself (same React components as the web report) owns the layout
 * through its print stylesheet; we only ask Chrome to honour the CSS page size.
 */
const LOCAL_CHROME =
  process.env.CHROME_EXECUTABLE_PATH ??
  (process.platform === 'darwin'
    ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
    : process.platform === 'win32'
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : '/usr/bin/google-chrome');

async function launch(): Promise<Browser> {
  if (process.env.VERCEL) {
    const chromium = (await import('@sparticuz/chromium')).default;
    return puppeteer.launch({
      args: await puppeteer.defaultArgs({ args: chromium.args, headless: 'shell' }),
      executablePath: await chromium.executablePath(),
      headless: 'shell',
    });
  }
  return puppeteer.launch({ executablePath: LOCAL_CHROME, headless: true });
}

export async function renderPdf(url: string): Promise<Uint8Array> {
  const browser = await launch();
  try {
    const page = await browser.newPage();
    await page.emulateMediaType('print');
    const res = await page.goto(url, { waitUntil: 'networkidle0', timeout: 45_000 });
    if (!res || !res.ok()) throw new Error(`Report page returned ${res?.status() ?? 'no response'}`);
    await page.evaluate(() => document.fonts.ready);
    return await page.pdf({
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
    });
  } finally {
    await browser.close();
  }
}

/** Origin of the current deployment, used to load the report page we render. */
export function siteOrigin(requestUrl: string): string {
  return new URL(requestUrl).origin;
}
