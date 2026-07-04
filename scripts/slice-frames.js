#!/usr/bin/env node
/**
 * Slice a video into a JPEG frame sequence for the scroll-scrub engine.
 *
 * Usage:
 *   node scripts/slice-frames.js <input.mp4> <clipName> [--frames 110] [--width 1600] [--q 5]
 *
 * Output:
 *   public/cinema/<clipName>/frame_0001.jpg ... (1-indexed)
 *   public/cinema/<clipName>/poster.jpg (copy of frame 1)
 *   public/cinema/manifest.json (merged entry for this clip)
 */
const {spawnSync} = require('child_process');
const fs = require('fs');
const path = require('path');

const FFMPEG = require('@ffmpeg-installer/ffmpeg').path;
const ROOT = path.resolve(__dirname, '..');
const CINEMA_DIR = path.join(ROOT, 'public', 'cinema');

const argValue = (name, fallback) => {
    const index = process.argv.indexOf(`--${name}`);
    return index !== -1 ? Number(process.argv[index + 1]) : fallback;
};

const [input, clipName] = process.argv.slice(2);
if (!input || !clipName) {
    console.error('Usage: node scripts/slice-frames.js <input.mp4> <clipName> [--frames N] [--width W] [--q Q]');
    process.exit(1);
}

const frames = argValue('frames', 110);
const width = argValue('width', 1600);
const quality = argValue('q', 5);

const probeDuration = (file) => {
    // No ffprobe in the installer package; parse "Duration: HH:MM:SS.cc" from ffmpeg stderr.
    const result = spawnSync(FFMPEG, ['-hide_banner', '-i', file], {encoding: 'utf8'});
    const match = /Duration:\s*(\d+):(\d+):(\d+)\.(\d+)/.exec(result.stderr || '');
    if (!match) throw new Error(`Could not parse duration from ffmpeg output for ${file}`);
    const [, hh, mm, ss, cc] = match.map(Number);
    return hh * 3600 + mm * 60 + ss + cc / 100;
};

const run = () => {
    const duration = probeDuration(input);
    const fps = frames / duration;
    const outDir = path.join(CINEMA_DIR, clipName);
    fs.rmSync(outDir, {recursive: true, force: true});
    fs.mkdirSync(outDir, {recursive: true});

    const args = [
        '-hide_banner', '-y',
        '-i', input,
        '-vf', `fps=${fps.toFixed(6)},scale=${width}:-2`,
        '-q:v', String(quality),
        '-frames:v', String(frames),
        path.join(outDir, 'frame_%04d.jpg'),
    ];
    const result = spawnSync(FFMPEG, args, {stdio: ['ignore', 'inherit', 'inherit']});
    if (result.status !== 0) throw new Error(`ffmpeg failed for ${input}`);

    const emitted = fs.readdirSync(outDir).filter((f) => /^frame_\d{4}\.jpg$/.test(f)).sort();
    if (emitted.length === 0) throw new Error('No frames emitted');
    fs.copyFileSync(path.join(outDir, emitted[0]), path.join(outDir, 'poster.jpg'));

    // Read the real output dimensions from the first frame (SOF0/SOF2 JPEG header).
    const jpegSize = (file) => {
        const buf = fs.readFileSync(file);
        for (let i = 2; i < buf.length - 9; i++) {
            if (buf[i] === 0xFF && (buf[i + 1] === 0xC0 || buf[i + 1] === 0xC2)) {
                return {height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7)};
            }
        }
        return {width, height: Math.round((width * 9) / 16)};
    };
    const dims = jpegSize(path.join(outDir, emitted[0]));

    const manifestPath = path.join(CINEMA_DIR, 'manifest.json');
    const manifest = fs.existsSync(manifestPath)
        ? JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
        : {clips: {}};
    manifest.clips[clipName] = {
        frames: emitted.length,
        width: dims.width,
        height: dims.height,
        pattern: 'frame_%04d.jpg',
        poster: 'poster.jpg',
    };
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

    const totalBytes = emitted.reduce((sum, f) => sum + fs.statSync(path.join(outDir, f)).size, 0);
    console.log(`[${clipName}] ${emitted.length} frames @ ${dims.width}x${dims.height}, ${(totalBytes / 1024 / 1024).toFixed(1)}MB`);
};

run();
