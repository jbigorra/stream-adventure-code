const 
  ws = require('websocket-stream'),
  stream = ws('ws://localhost:8099');

stream.end('hello\n');