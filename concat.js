const 
  cs = require('concat-stream');


process
  .stdin
  .pipe(cs((data) => {
    const reversed = data.reverse().toString();
    // concat-stream does not return a readable stream but a 
    // writable one. Writeable strings cannot be piped. So we 
    //just need to `write` the next stream to stdout.
    process.stdout.write(reversed);
    // or we could just console.log the reversed string
    //console.log(reversed);
  }));