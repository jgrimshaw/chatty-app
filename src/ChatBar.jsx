
import React, {Component} from 'react';

class ChatBar extends Component{
  constructor(){
    super();
  }

  render(){

    const keyPress = (event) => {
      if(event.keyCode === 13){
        let user = (this.props.currentUser.name ? this.props.currentUser.name : "anonymous");
        this.props.SendMessage(event.target.value, user);
        event.target.value = "";
      }
    };

    const keyPress = (event) => {
      if(event.keyCode === 13){
        this.props.SendNotification(event.target.value)
      }
    };

    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} />
        <input className="chatbar-message" name="message" placeholder="Type a message and hit ENTER" />
      </footer>
    )
  }
}

export default ChatBar;


