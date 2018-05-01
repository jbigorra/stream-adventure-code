const 
  through = require('through2'),
  stream = through(write);

function write (buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase());
  next();
};

process.stdin.pipe(stream).pipe(process.stdout);