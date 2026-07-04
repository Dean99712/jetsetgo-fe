#!/usr/bin/env node
/**
 * Playwright verification of the scroll-cinematic landing.
 * Assumes the app is being served (dev server or scripts/serve-build.js).
 *
 * Usage: node scripts/verify-landing.js [baseUrl] [shotDir]
 */
const path = require('path');
const {chromium} = require('playwright-core');

const BASE = process.argv[2] || 'http://localhost:4173';
const SHOT_DIR = process.argv[3] || path.resolve(__dirname, '..', 'assets-src', 'verify');
const CHROME = process.env.CINEMA_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const results = [];
const check = (name, ok, detail = '') => {
    results.push({name, ok, detail});
    console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
};

(async () => {
    const browser = await chromium.launch({executablePath: CHROME, args: ['--no-sandbox']});

    // ---------- Desktop scroll-through ----------
    const page = await browser.newPage({viewport: {width: 1440, height: 900}});
    const consoleErrors = [];
    page.on('pageerror', (err) => consoleErrors.push(String(err)));
    await page.goto(`${BASE}/`, {waitUntil: 'networkidle'});
    await page.waitForTimeout(4000); // preloader + coarse pass

    const scrollHeight = await page.evaluate(() => document.body.scrollHeight - window.innerHeight);
    const canvasHashes = [];
    const fractions = [0, 0.15, 0.35, 0.5, 0.7, 0.9];
    for (const fraction of fractions) {
        await page.evaluate((y) => window.scrollTo(0, y), Math.round(scrollHeight * fraction));
        await page.waitForTimeout(1200);
        const shot = path.join(SHOT_DIR, `desktop-${String(fraction).replace('.', '_')}.png`);
        await page.screenshot({path: shot});
        const hash = await page.evaluate(() => {
            const canvas = document.querySelector('.cinema-scrub__canvas');
            if (!canvas) return null;
            // Sample a center block — footage can have static sky at the edges.
            const cx = Math.floor(canvas.width / 2) - 16;
            const cy = Math.floor(canvas.height / 2) - 16;
            return canvas.getContext('2d').getImageData(cx, cy, 32, 32).data.join(',');
        });
        canvasHashes.push(hash);
    }
    const distinct = new Set(canvasHashes.filter(Boolean)).size;
    check('hero canvas scrubs with scroll', distinct >= 2, `${distinct} distinct canvas states across ${fractions.length} stops`);
    check('no page exceptions on landing', consoleErrors.length === 0, consoleErrors[0] || '');

    const bookHref = await page.evaluate(() => !!document.querySelector('.cinema-nav'));
    check('cinema nav present', bookHref);
    await page.close();

    // ---------- Mobile: no frame downloads ----------
    const mobile = await browser.newPage({viewport: {width: 390, height: 844}});
    const mobileFrameRequests = [];
    mobile.on('request', (req) => {
        if (/\/cinema\/.*frame_\d+\.jpg/.test(req.url())) mobileFrameRequests.push(req.url());
    });
    await mobile.goto(`${BASE}/`, {waitUntil: 'networkidle'});
    await mobile.waitForTimeout(2500);
    await mobile.evaluate(() => window.scrollTo(0, 2000));
    await mobile.waitForTimeout(1500);
    check('mobile downloads zero scrub frames', mobileFrameRequests.length === 0, `${mobileFrameRequests.length} frame requests`);
    const mobilePosters = await mobile.locator('.cinema-scrub__poster').count();
    check('mobile renders posters', mobilePosters >= 1, `${mobilePosters} posters`);
    await mobile.screenshot({path: path.join(SHOT_DIR, 'mobile.png')});
    await mobile.close();

    // ---------- Reduced motion: no frame downloads ----------
    const rmContext = await browser.newContext({viewport: {width: 1440, height: 900}, reducedMotion: 'reduce'});
    const rmPage = await rmContext.newPage();
    const rmFrameRequests = [];
    rmPage.on('request', (req) => {
        if (/\/cinema\/.*frame_\d+\.jpg/.test(req.url())) rmFrameRequests.push(req.url());
    });
    await rmPage.goto(`${BASE}/`, {waitUntil: 'networkidle'});
    await rmPage.waitForTimeout(2500);
    check('reduced-motion downloads zero scrub frames', rmFrameRequests.length === 0, `${rmFrameRequests.length} frame requests`);
    await rmContext.close();

    // ---------- Route regressions ----------
    const routes = await browser.newPage({viewport: {width: 1440, height: 900}});
    await routes.goto(`${BASE}/book`, {waitUntil: 'networkidle'});
    await routes.waitForTimeout(1500);
    check('/book renders search card', (await routes.locator('.glass-search__card').count()) === 1);
    await routes.screenshot({path: path.join(SHOT_DIR, 'book.png')});
    await routes.goto(`${BASE}/login`, {waitUntil: 'networkidle'});
    await routes.waitForTimeout(1000);
    check('/login renders', (await routes.evaluate(() => document.body.innerText)).includes('Login'));
    await routes.close();

    await browser.close();

    const failed = results.filter((r) => !r.ok);
    console.log(failed.length === 0 ? '\nAll checks passed.' : `\n${failed.length} check(s) FAILED.`);
    process.exit(failed.length === 0 ? 0 : 1);
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
