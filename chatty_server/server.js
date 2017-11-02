const express = require('express');
const http = require('http');
const ws = require('ws');
const app = express();
const server = http.createServer(app);
const wss = new ws.Server({ server });

app.use(express.static('public'));

function broadcast(data) {
  wss.clients.forEach((client) => {
    if (client.readyState === ws.OPEN) {
      client.send(data);
    }
  })
}

let numUsers = 0;

function sendNumUsers(socket) {
  broadcast(JSON.stringify({
    type: 'incomingNumUsers',
    content: numUsers
  }));
}

wss.on('connection', (socket) => {
  numUsers++;
  console.log('numUsers:', numUsers);
  sendNumUsers();
  
  socket.on('message', (data) => {
    console.log('New message', data);
    
    var data = JSON.parse(data);
    
    switch(data.type) {
      case 'postMessage':
        data.type = 'incomingMessage';
        break;
      case 'postNotification':
        data.type = 'incomingNotification';
        break;
      default:
        console.error("Unknown event type:", data.type);
    }
    
    broadcast(JSON.stringify(data));
  })
  
  socket.on('close', () => {
    console.log('connection closed');
    numUsers--;
    console.log('numUsers:', numUsers);
    sendNumUsers();
  })

})

server.listen(3001, function listening() {
  console.log('Listening on %d', server.address().port);
})

