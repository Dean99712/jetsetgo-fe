#!/usr/bin/env node
/**
 * Synthesize three placeholder 1080p clips (brand-colored animated gradients
 * with a frame counter) so the whole scroll-scrub pipeline and site can be
 * built and verified before the real AI-generated clips land. Swapping in the
 * real clips is then just: replace the mp4, re-run slice-frames.js.
 *
 * Usage: node scripts/make-placeholders.js
 */
const {spawnSync} = require('child_process');
const fs = require('fs');
const path = require('path');

const FFMPEG = require('@ffmpeg-installer/ffmpeg').path;
const ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT, 'assets-src');
const FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';

// Per-clip palette: [top RGB, bottom RGB] — navy/gold sunrise, warm cabin, dusk coast.
const CLIPS = {
    hero: {a: [6, 11, 31], b: [236, 170, 68], frames: 120},
    cabin: {a: [42, 30, 20], b: [245, 222, 184], frames: 96},
    destinations: {a: [4, 8, 26], b: [76, 127, 214], frames: 96},
};

const DURATION = 5;
const FPS = 24;

const geqChannel = (lo, hi) =>
    `${lo}+(${hi}-${lo})*clip(Y/H+0.18*sin(2*PI*N/${DURATION * FPS}+X/W*3)\\,0\\,1)`;

fs.mkdirSync(SRC_DIR, {recursive: true});

for (const [name, {a, b, frames}] of Object.entries(CLIPS)) {
    const out = path.join(SRC_DIR, `${name}.mp4`);
    const geq = `geq=r='${geqChannel(a[0], b[0])}':g='${geqChannel(a[1], b[1])}':b='${geqChannel(a[2], b[2])}'`;
    const drawtext = fs.existsSync(FONT)
        ? `,drawtext=fontfile=${FONT}:text='${name.toUpperCase()} %{n}':fontsize=72:fontcolor=white@0.35:x=(w-text_w)/2:y=(h-text_h)/2`
        : '';
    const args = [
        '-hide_banner', '-y',
        '-f', 'lavfi', '-i', `color=c=black:s=1920x1080:r=${FPS}:d=${DURATION}`,
        '-vf', `format=rgb24,${geq}${drawtext},format=yuv420p`,
        '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20',
        out,
    ];
    console.log(`Synthesizing ${name}.mp4 ...`);
    const result = spawnSync(FFMPEG, args, {stdio: ['ignore', 'ignore', 'inherit']});
    if (result.status !== 0) throw new Error(`ffmpeg synth failed for ${name}`);

    const slice = spawnSync('node', [
        path.join(__dirname, 'slice-frames.js'), out, name, '--frames', String(frames),
    ], {stdio: 'inherit'});
    if (slice.status !== 0) throw new Error(`slice failed for ${name}`);
}

console.log('Placeholder pipeline complete.');
