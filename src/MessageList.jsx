import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

export default class MessageList extends Component {
  render(){
    return (
      <main className="messages"> {this.props.messages.map((message) => {
        return
        <div>
        <Message message={message} />
        <Notification />
        </div>
      })}
      </main>
    );
  }
}

