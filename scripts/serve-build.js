#!/usr/bin/env node
/**
 * Minimal static server for the production build with SPA fallback,
 * so client-side routes like /book work on direct navigation.
 *
 * Usage: node scripts/serve-build.js [port]
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', 'build');
const PORT = Number(process.argv[2]) || 4173;

const MIME = {
    '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
    '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png',
    '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.map': 'application/json',
    '.woff': 'font/woff', '.woff2': 'font/woff2', '.txt': 'text/plain',
};

http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    let filePath = path.normalize(path.join(ROOT, urlPath));
    if (!filePath.startsWith(ROOT)) {
        res.writeHead(403);
        return res.end();
    }
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(ROOT, 'index.html'); // SPA fallback
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {'Content-Type': MIME[ext] || 'application/octet-stream'});
    fs.createReadStream(filePath).pipe(res);
}).listen(PORT, () => console.log(`build served at http://localhost:${PORT}`));
