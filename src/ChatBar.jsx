
import React, {Component} from "react";

class ChatBar extends Component {
  constructor() {
    super();
  }
  render() {
    const keyPressMessage = (event) => {
      if(event.keyCode === 13) {
        let user = (this.props.currentUser.name ? this.props.currentUser.name : "anonymous");
        this.props.SendMessage(event.target.value, user);
        event.target.value = "";
      }
    };
    const keyPressUser = (event) => {
      if(event.keyCode === 13) {
        this.props.SendNotification(event.target.value);
      }
    };

    return (
      <footer className="chatbar">
        <input className="chatbar-username" onKeyUp={keyPressUser} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" onKeyUp={keyPressMessage} placeholder="Type a message and hit ENTER"  />
      </footer>
    );
  }
}

export default ChatBar;

