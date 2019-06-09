
import React, {Component} from 'react';
import {Message, Notification, Picture} from "./Message.jsx";

function MessageList (props) {
    const messages = props.messageData.map((message) => {
      //Checks whether message type is Notification, Picture or message. Default is message
      switch (message.type) {
        case 'postNotification' :
          return (<Notification key={message.id} message={message}/>);
        case 'postPicture' :
          return (<Picture key={message.id} message={message}/>);
        default :
          return (<Message key={message.id} username={message.username} content={message.content}/>);
      }
    });
    return (
        <main className="messages">
          {messages}
        </main>)
}

export default MessageList;