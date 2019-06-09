// server.js

const express = require('express');
const WebSocket = require('ws');
const uuid = require('uuid');
const SocketServer = WebSocket.Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = (data) => {
    wss.clients.forEach(function (client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
      }
    });
  };

function sendNumUsers() {
    wss.broadcast({
      type:"numUsers",
      users: usersOnline
});
}

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Set up a callback for when a client closes the socket.
  //This usually means they closed their browser.

  ws.on('close', () => {
    console.log('Client disconnected')
    usersOnline --;
    sendNumUsers()
    });
});