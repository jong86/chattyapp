const express = require('express');
const http = require('http');
const ws = require('ws');

const app = express();

app.use(express.static('public'));

const server = http.createServer(app);
const wss = new ws.Server({ server });

function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      client.send(data);
    }
  })
}

wss.on('connection', (socket) => {

  socket.on('message', (data) => {
    console.log('New message', data);
    broadcast(data);
  })

})

server.listen(3001, function listening() {
  console.log('Listening on %d', server.address().port);
})

