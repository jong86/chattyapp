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

// To keep track of connected clients:
let numUsers = 0;

// Sends number of connected clients to client:
function sendNumUsers(socket) {
  broadcast(JSON.stringify({
    type: 'incomingNumUsers',
    content: numUsers
  }));
}

wss.on('connection', (socket) => {
  numUsers++;
  sendNumUsers();
  
  socket.on('message', (data) => {
    var data = JSON.parse(data);
    if (data.username === '') data.username = 'Anonymous';
    
    // Routing of messages from client:
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
    numUsers--;
    sendNumUsers();
  })

})

server.listen(3001, function listening() {
  console.log('Listening on %d', server.address().port);
})
