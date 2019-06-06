import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from "./MessageList.jsx";
import data from './data.jsx';
// const socket = new WebSocket("ws://localhost:3001");



class App extends Component {
    constructor(props) {
    super(props),
    this.state = {
      loading: true,
      currentUser: {name: 'Anonymus'},
      messages: []
    };
  }


// newMessage = (evt) => {
//   evt.preventDefault();
//   const messageInput = evt.target.value;
//   this.state.message = messageInput
//   }


  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messages} currentUser={this.state.currentUser.name} />
        <ChatBar currentUser={this.state.currentUser.name}/>
      </div>
    );
  }
};


export default App;

