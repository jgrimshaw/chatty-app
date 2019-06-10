
import React, {Component} from 'react';
import {Message, Notification} from "./Message.jsx";

function MessageList (props) {
    const messages = props.messageText.map((message) => {

      // chek the type of message
      switch (message.type) {
        case 'postNotification' : return (<Notification key={message.id} message={message}/>);
        default : return (<Message key={message.id} username={message.username} content={message.content}/>);
      }
    });
    return ( <main className="messages">{messages}</main> );
}

export default MessageList;