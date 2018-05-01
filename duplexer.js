
const spawn = require('child_process').spawn;
const duplexer = require('duplexer2');

module.exports = function (cmd, args) {
  const child = spawn(cmd, args);
  return duplexer(child.stdin, child.stdout);
}
