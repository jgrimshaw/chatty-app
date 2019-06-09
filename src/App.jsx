
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
      messageData: [],
      usersOnline: 0,
      color: ''
    };
    this.SendMessage = this.SendMessage.bind(this);
    this.SendNotification = this.SendNotification.bind(this);
  }


  componentDidMount () {
    //sets up web socket
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
        case 'postPicture' :
          let newMessageData = this.state.messageData;
          newMessageData.push(newMessage);
          this.setState((previousState) => ({messageData: newMessageData}));
          break;

        default :
          console.log('Should not be here');
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
      color: this.state.color
    };

    let url = newMessage.content.slice(newMessage.content.length-3);
    if (url === 'jpg' || url === 'gif' || url === 'png') {
      newMessage.type = 'incomingPicture';
    }
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


  render() {
    return (
      <div>
        <NavBar usersOnline={this.state.usersOnline}/>
        {this.state.loading ? <h1>Loading........</h1> : <MessageList messageData={this.state.messageData}/>}
        <ChatBar currentUser={this.state.currentUser} SendMessage={this.SendMessage} SendNotification={this.SendNotification}/>
      </div>
    );
  }
}
export default App;
