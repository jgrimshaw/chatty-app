import React, {Component} from 'react';

export function Message (props) {
    return (
      <div className="message">
        <span className="message-username">{props.username}</span>
        <span className="message-content">{props.content}</span>
      </div>
    );
}

export function Notification (props){
  return (
    <div className="message system">
    {props.content}
    </div>
  );
}
