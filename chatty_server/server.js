
const express = require('express');
const WebSocket = require('ws');
const uuid = require("uuid");
const SocketServer = WebSocket.Server;
const PORT = 3001;
const server = express()

  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.broadcast = (data) => {
    wss.clients.forEach(function (client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
      }
    });
  };

function sendNumOfUsers() {
    wss.broadcast({
      type:"numUsers",
      users: usersOnline
    });
}

let usersOnline = 0;
wss.on('connection', (ws) => {
  console.log('connected');
  usersOnline ++;
  sendNumOfUsers();

  ws.on('message', (message) => {
    messageObj = JSON.parse(message);
    messageObj.id = uuid();

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

      default :
        console.log("...default");
        break;
    }
  });

  ws.on('close', () => {
    console.log('disconnected');
    usersOnline --;
    sendNumOfUsers();
  });
});