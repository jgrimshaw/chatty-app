
import React, {Component} from 'react';

class ChatBar extends Component{
  constructor(){
    super();
  }

  render(){

    const keyPressContent = (event) => {
      if(event.keyCode === 13){
        let user = (this.props.currentUser.name ? this.props.currentUser.name : "anonymous");
        this.props.MessageType(event.target.value, user);
        event.target.value = "";
      }
    };

    const keyPressUser = (event) => {
      if(event.keyCode === 13){
        this.props.UserType(event.target.value);
      }
    };

    return (
      <footer className="chatbar">
        <input className="chatbar-username" onKeyUp={keyPressUser} placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name ? this.props.currentUser.name : "anonymous"} />
        <input className="chatbar-message" onKeyUp={keyPressContent} name="message" placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}

export default ChatBar;


