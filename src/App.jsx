import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from "./MessageList.jsx";



class App extends Component {
    constructor(props) {
    super(props),
    this.state = {
      loading: true,
      currentUser: {name: ''},
      messageData: [],
      usersOnline: 0,
    };
    this.SendMessage = this.SendMessage.bind(this);
    this.SendNotification = this.SendNotification(this)
  }

componentDidMount() {
  this.socket = new WebSocket("ws://localhost:3001");
  this.socket.onopen = function(event){

  }

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
          this.setState((prevState) => ({messageData: newMessageData}));
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


SendMessage(text, user) {
  let newMessage = {
    type: "incomingMessage",
    content: text,
    username: user
  }
  this.socket.send(JSON.stringify(newMessage));
}

 SendNotification (newUser){
  let newNotification = {
    type: "incomingNotification",
    content: newUser,
    username: this.state.currentUser.name
  }
  this.setState({currentUser: {name: newUser}});
  this.socket.send(JSON.stringify(newNotification));
}


  render() {
    return (
      <div>
        <NavBar usersOnline={this.state.usersOnline}/>
        <MessageList messages={this.state.messageData} currentUser={this.state.currentUser.name} />
        <ChatBar currentUser={this.state.currentUser} MessageType={this.MessageType} />
      </div>
    );
  }
};

function randomId(){
  return Math.floor(Math.random() * 1000)
}

export default App;

