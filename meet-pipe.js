const 
  fs = require('fs'),
  file = process.argv[2] || 'text.txt';


fs.createReadStream(file).pipe(process.stdout);