const Fs = require('fs')
const html = './index.html'

module.exports = home

function home(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  return Fs.createReadStream(html).pipe(res);
}