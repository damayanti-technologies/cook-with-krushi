/**
 * Optional local static preview server (Zero external dependencies)
 * Run: node serve.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  
  let fullPath = path.join(ROOT, reqPath);

  // Security check: ensure path is within ROOT
  if (!fullPath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // Check if file exists
  if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
    fullPath = path.join(fullPath, 'index.html');
  }

  if (!fs.existsSync(fullPath)) {
    // Fallback to offline or index
    const notFoundPage = path.join(ROOT, 'offline.html');
    if (fs.existsSync(notFoundPage)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(notFoundPage).pipe(res);
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
    return;
  }

  const ext = path.extname(fullPath).toLowerCase();
  res.writeHead(200, {
    'Content-Type': MIME[ext] || 'application/octet-stream',
    'Access-Control-Allow-Origin': '*'
  });
  fs.createReadStream(fullPath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`\nCook With Krushi Preview Server running at: http://localhost:${PORT}`);
  console.log(`Powered by Damayanti Technologies\n`);
});
