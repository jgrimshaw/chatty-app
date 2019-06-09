import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from "./MessageList.jsx";

const socket = new WebSocket("ws://localhost:3001");

class App extends Component {
    constructor(props) {
    super(props),
    this.state = {
      loading: true,
      currentUser: {name: ''},
      messageData: messages,
      id: "01"
    };
  }

componentDidMount() {
    setTimeout( () => {
      this.setState({loading:false});
    }, 2000);

    setTimeout(() => {
      const newMessage = {id: 10, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messageData.concat(newMessage);
      this.setState({messageData: messages});
    }, 4000);
  }

MessageType (text, user){
  const id = randomId();
  let newMessage = {
    type: "incomingMessage",
    content: text,
    username: user,
    id
  }
  let allMessages = this.state.messageData;
  allMessages.push(newMessage);
  this.setState({messageData: allMessages})
}
  render() {
    return (
      <div>
        <NavBar />
        <MessageList messages={this.state.messageData} currentUser={this.state.currentUser.name} />
        <ChatBar currentUser={this.state.currentUser} MessageType={this.MessageType} />
      </div>
    );
  }
};


export default App;




let messages = [
  {
    type: "incomingMessage",
    content: "I won't be impressed with technology until I can download food.",
    username: "Anonymous1",
    id: 1
  },
  {
    type: "incomingNotification",
    content: "Anonymous1 changed their name to nomnom",
    id: 2
  },
  {
    type: "incomingMessage",
    content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
    username: "Anonymous2",
    id: 3
  },
  {
    type: "incomingMessage",
    content: "...",
    username: "nomnom",
    id: 4
  },
  {
    type: "incomingMessage",
    content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
    username: "Anonymous2",
    id: 5
  },
  {
    type: "incomingMessage",
    content: "This isn't funny. You're not funny",
    username: "nomnom",
    id: 6
  },
  {
    type: "incomingNotification",
    content: "Anonymous2 changed their name to NotFunny",
    id: 7
  },
]

