const 
  http = require('http'),
  thr = require('through2'),
  port = process.argv[2] || 3000,
  stream = thr(write);

const server = http.createServer();

server.listen(port);

server.on('request', (req, res) => {
  const { method, url } = req;
  if (method !== 'POST') {
    res.writeHead(404, 'Route not found');
    res.end();
  }

  req
    .pipe(stream)
    .pipe(res);
});

function write(buffer, _, next) {
  this.push(buffer.toString().toUpperCase());
  next();
}

