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
          "{name ? name : "anonymous"}" changed their name to "{props.message.content}"
        </div>)
}



