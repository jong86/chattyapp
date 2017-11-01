// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Array that stores messages on server:
const messages = [];

// Broadcasts messages to all clients:
wss.broadcast = (messages) => {
  console.log("Broadcasting..");
  wss.clients.forEach((client) => {
    console.log("There is a client...");
    // if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(messages));
    // }
  });
};

wss.on('connection', (ws) => {
  console.log("Client connected.");
  ws.on('message', (message) => {
    // Broadcast to everyone else.
    console.log("Received message:", JSON.parse(message));
    wss.clients.forEach((client) => {
      console.log("There is a client.");
      // if (client !== ws && client.readyState === WebSocket.OPEN) {
        console.log("Pushing the following message to array:", message);
        messages.push(message);
        client.send(JSON.stringify(message));
      // }
    });
  });
});

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
// wss.on('connection', (ws) => {
//   console.log("Client connected.");
//   ws.send("You are connected to server.");
//   ws.on('message', (message) => {
//     console.log("content received on server side:", JSON.parse(message));
//     console.log("Messages array:", messages);
//   })
//   // Set up a callback for when a client closes the socket. This usually means they closed their browser.
//   ws.on('close', () => console.log('Client disconnected'));
// });
