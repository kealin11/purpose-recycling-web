import fs from 'node:fs'
import http from 'node:http'
import path from 'node:path'

const root = path.resolve('dist')
const port = Number(process.env.PORT ?? 4173)
const host = process.env.HOST ?? '127.0.0.1'
const types = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

http.createServer((req, res) => {
  const requestPath = decodeURIComponent(req.url.split('?')[0])
  const filePath = path.join(root, requestPath === '/' ? 'index.html' : requestPath)

  if (!filePath.startsWith(root)) {
    res.writeHead(403)
    res.end('Forbidden')
    return
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404)
      res.end('Not found')
      return
    }

    res.writeHead(200, {
      'Cache-Control': requestPath.includes('/optimized/') ? 'public, max-age=31536000, immutable' : 'no-cache',
      'Content-Type': types[path.extname(filePath)] ?? 'application/octet-stream',
    })
    res.end(data)
  })
}).listen(port, host, () => {
  console.log(`Serving dist at http://${host}:${port}/`)
})
