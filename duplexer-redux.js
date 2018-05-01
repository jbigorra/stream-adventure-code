const duplexer = require('duplexer2');
const through = require('through2').obj;

module.exports = function (counter) {
  const count = {};
  const wr = through(function (chunk, _, next) {
      count[chunk.country] = (count[chunk.country] || 0) + 1;
      next();
    }, function () {
      counter.setCounts(count);
      this.end();
    }
  );
  return duplexer({objectMode:true}, wr, counter);
}