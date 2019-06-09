import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
import MessageList from "./MessageList.jsx";
import data from "./data.json";
// const socket = new WebSocket("ws://localhost:3001");

class App extends Component {
    constructor(props) {
    super(props),
    this.state = {
      loading: true,
      currentUser: {name: 'Anonymusmmm'},
      messages: [],
      id: "01"
    };
  }




componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}

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

