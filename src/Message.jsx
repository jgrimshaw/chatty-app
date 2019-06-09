import React, {Component} from "react";

export function Message (props) {
    return (
        <div className="message">
          <span className="message-username" >{props.username}</span>
          <span className="message-content">{props.content}</span>
        </div>)
}

export function Notification (props) {
    let name = props.message.username;
    return (
        <div className="message system">
          "{name ? name : "Anonymous"}" changed there name to "{props.message.content}"
        </div>)
}

export function Picture (props) {
    return (
      <div className="message">
        <span className="message-username" style={{'color': props.message.color}}>{props.message.username}</span>
        <span className="message-content">
            <img src={props.message.content} style={{width: '200px'}} alt={props.message.content}/>
        </span>
      </div>)
}


