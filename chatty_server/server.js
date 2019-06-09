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


let usersOnline = 0; //Variable to keep track of number of users
wss.on('connection', (ws) => {
  console.log('Client connected');
  usersOnline ++; //increases user count everytime someone connects
  //When someone connects it sends notification to all
  sendNumUsers();
  //When someone connects it sends a color to be added to state for that one person
  ws.send(assignColor());

//When it recieves a message
  ws.on('message', (message) => {
    messageObj = JSON.parse(message);
    messageObj.id = uuid();

    // check for type
    switch(messageObj.type) {
      case 'incomingNotification' :
        messageObj.type = 'postNotification';
        wss.broadcast(messageObj);
        break;
      case 'incomingMessage' :
        console.log('Sending message');
        messageObj.type = 'postMessage';
        wss.broadcast(messageObj);
        break;
      case 'incomingPicture' :
        messageObj.type = 'postPicture';
        wss.broadcast(messageObj);
        break;
      case Default :
        console.log("For some reason in the default");
        break;
    }
  });

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