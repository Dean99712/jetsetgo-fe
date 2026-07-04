#!/usr/bin/env node
/**
 * Render the three cinematic clips locally from the three.js scenes exposed at
 * the dev-only /__render route, then feed them through the standard pipeline:
 * PNG frames → mp4 in assets-src/ → scripts/slice-frames.js → public/cinema/.
 *
 * Requires the CRA dev server to be running (default http://localhost:3000).
 *
 * Usage: node scripts/render-clips.js [baseUrl] [--clip hero|cabin|destinations]
 */
const {spawnSync} = require('child_process');
const fs = require('fs');
const path = require('path');
const {chromium} = require('playwright-core');

const FFMPEG = require('@ffmpeg-installer/ffmpeg').path;
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'assets-src');
const CHROME = process.env.CINEMA_CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const BASE = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'http://localhost:3000';
const onlyIndex = process.argv.indexOf('--clip');
const only = onlyIndex !== -1 ? process.argv[onlyIndex + 1] : null;

const CLIPS = {
    hero: {t0: 26.5, duration: 5, frames: 120},
    cabin: {t0: 4, duration: 5, frames: 96},
    destinations: {t0: 8, duration: 5, frames: 96},
};

const RENDER_FPS = 24;

(async () => {
    const browser = await chromium.launch({
        executablePath: CHROME,
        args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
    });
    const page = await browser.newPage({viewport: {width: 1920, height: 1080}, deviceScaleFactor: 1});

    for (const [name, config] of Object.entries(CLIPS)) {
        if (only && only !== name) continue;
        const captureCount = config.duration * RENDER_FPS; // 120 capture frames per 5s clip
        const outDir = path.join(SRC_DIR, 'rendered', name);
        fs.rmSync(outDir, {recursive: true, force: true});
        fs.mkdirSync(outDir, {recursive: true});

        console.log(`[${name}] loading render stage ...`);
        await page.goto(`${BASE}/__render?clip=${name}`, {waitUntil: 'networkidle'});
        await page.waitForFunction(() => window.__renderReady === true, null, {timeout: 60000});
        await page.waitForTimeout(1500); // let the Environment cubemap settle

        const started = Date.now();
        for (let i = 0; i < captureCount; i++) {
            const t = config.t0 + (i / (captureCount - 1)) * config.duration;
            await page.evaluate((time) => window.__setRenderTime(time), t);
            await page.waitForFunction((time) => window.__frameReady === time, t, {timeout: 15000});
            await page.screenshot({
                path: path.join(outDir, `frame_${String(i + 1).padStart(4, '0')}.png`),
                clip: {x: 0, y: 0, width: 1920, height: 1080},
            });
            if ((i + 1) % 24 === 0) {
                console.log(`[${name}] captured ${i + 1}/${captureCount} (${((Date.now() - started) / 1000).toFixed(0)}s)`);
            }
        }

        console.log(`[${name}] encoding mp4 ...`);
        const mp4 = path.join(SRC_DIR, `${name}.mp4`);
        const encode = spawnSync(FFMPEG, [
            '-hide_banner', '-y',
            '-framerate', String(RENDER_FPS),
            '-i', path.join(outDir, 'frame_%04d.png'),
            '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p',
            mp4,
        ], {stdio: ['ignore', 'ignore', 'inherit']});
        if (encode.status !== 0) throw new Error(`encode failed for ${name}`);

        const slice = spawnSync('node', [
            path.join(__dirname, 'slice-frames.js'), mp4, name, '--frames', String(config.frames),
        ], {stdio: 'inherit'});
        if (slice.status !== 0) throw new Error(`slice failed for ${name}`);
    }

    await browser.close();
    console.log('Render pipeline complete.');
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
