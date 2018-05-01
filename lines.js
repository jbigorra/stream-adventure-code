const 
  thr = require('through2'),
  split = require('split2'),
  stream = thr(write);

let count = 1;

function write(buffer, encoding, next) {
  const line = buffer.toString();
  if (count % 2 === 0) 
    this.push(line.toUpperCase() + '\n');
  else 
    this.push(line.toLowerCase() + '\n');
  count++;
  next();
}

process
  .stdin
  .pipe(split())
  .pipe(stream)
  .pipe(process.stdout);
