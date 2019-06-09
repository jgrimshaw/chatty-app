
import React, {Component} from 'react';

class ChatBar extends Component{



  render(){
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} />
        <input className="chatbar-message" name="message" placeholder="Type a message and hit ENTER" />
      </footer>

    );
  }
};

export default ChatBar;


