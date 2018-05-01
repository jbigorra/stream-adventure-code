const 
  Trumpet = require('trumpet'),
  thr = require('through2'),
  map = thr(write);

function write(buffer, _, next) {
  this.push(buffer.toString().toUpperCase());
  next();
}

// We create the trumpet stream which is in charge of getting the input from stdin
// and then outputting the modified input to stdout.
const trumpetStream = Trumpet();

// Pipe in stdin to trumpetStream and pipe out trumpetStream
// output to stdout.
process
  .stdin
  .pipe(trumpetStream)
  .pipe(process.stdout);

// We proceed to select the element class and create a Duplex Stream
// which can receive and output data into itself.
const loudHtmlStream = trumpetStream.select('.loud').createStream();

// Finally we pipe through `map` which will uppercase the innerHtml of the 
// selected element and then piping in that uppercased string back into loudHtmlStream.
loudHtmlStream
  .pipe(map)
  .pipe(loudHtmlStream);

// Note: Is important to consider that trumpetStream and loudHtmlStream are two different
// strings. And that Trumpet internal code does some magic in the process to attach 
// the modified string overwritting the innerHtml of the selected element. 