
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from "./MessageList.jsx";

class App extends Component {

  constructor () {
    super();
    this.state = {
      loading: true,
      currentUser: {name: ''},
      messageText: [],
      usersOnline: 0,
    };
    this.SendMessage = this.SendMessage.bind(this);
    this.SendNotification = this.SendNotification.bind(this);
  }


  componentDidMount () {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = function(event) {
      console.log("Connected to WebSocket Server");
    };
    this.socket.onmessage = (message) => {
      const newMessage = JSON.parse(message.data);
      switch (newMessage.type) {

        case 'numUsers' :
          this.setState({usersOnline: newMessage.users});
          break;
        case 'postMessage' :
        case 'postNotification' :
          let newMessageText = this.state.messageText;
          newMessageText.push(newMessage);
          this.setState((prevState) => ({messageText: newMessageText}));
          break;
        }
      };
    setTimeout( () => {
      this.setState({loading:false});
    }, 2000);
  }

// methods
  SendMessage (text, user) {
    let newMessage = {
      type: "incomingMessage",
      content: text,
      username: user,
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  SendNotification (newUser) {
    let newNotification = {
      type: 'incomingNotification',
      content: newUser,
      username: this.state.currentUser.name
    };
    this.setState({currentUser: {name: newUser}});
    this.socket.send(JSON.stringify(newNotification));
  }

// render components to index.html
  render() {
    return (
      <div>
        <NavBar usersOnline={this.state.usersOnline}/>
        {this.state.loading ? <h1>loading . . .</h1> : <MessageList messageText={this.state.messageText}/>}
        <ChatBar currentUser={this.state.currentUser} SendMessage={this.SendMessage} SendNotification={this.SendNotification}/>
      </div>
    );
  }
}
export default App;
