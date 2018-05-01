const 
  combine = require('stream-combiner'),
  split = require('split2'),
  through = require('through2'),
  zlib = require('zlib');

module.exports = function () {

  const def = { name:'', books: [] };
  const holder = [];

  function write(chunk, _, next) {
    return handleChunk(this, chunk, next);
  }

  function end(done) {
    done();
  }

  return combine(
    split(),
    through(write, end),
    zlib.createGzip(),
  );
}

let genre = ''; books = [];

function handleChunk(that, chunk, next) {
  if (chunk != '') {

    const obj = JSON.parse(chunk);

    if (genre && obj.type == 'genre' && obj.name !== genre) {
      that.push(JSON.stringify({ name: genre, books: books }) + '\n');
      books = [];
    }

    if (obj.type === 'genre') genre = obj.name; 
    else books.push(obj.name);
  }

  return next();
}