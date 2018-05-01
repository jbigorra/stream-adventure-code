const
  request = require('request'),
  url = 'http://localhost:8099';

process
  .stdin
  .pipe(
    request
    .post(url)
    .on('error', err => console.error(err))
  )
  .pipe(process.stdout);

