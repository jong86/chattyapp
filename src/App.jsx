import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

// Generates a UUID:
const uuidv4 = require('uuid/v4');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob'},
      messages: [] // messages coming from server are stored here as they arrive
    }
    this.onNewPost = this.onNewPost.bind(this);
  }
  
  componentDidMount() {
    console.log('componentDidMount <App />')
    
    this.socket = new WebSocket('ws://localhost:3001');
    
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    }


    this.socket.onmessage = (event) => {
      const newMessageObj = JSON.parse(event.data);
      
      switch(newMessageObj.type) {
        case 'incomingMessage':
          console.log('Incoming message:', newMessageObj);
          //stuff
          break;
        case 'incomingNotification':
          console.log('Incoming notification:', newMessageObj);
          //stuff
          break;
        default:
          //stuff
          console.error("Unknown event type:", newMessageObj.type);
      }

      this.setState({messages: this.state.messages.concat([newMessageObj]) });

    }
  }

  onNewPost(content, username, type) {
    setTimeout(() => {
      const newMessageObj = {
        id: uuidv4(),
        username: username,
        content: content,
        type: type
      };
      this.socket.send(JSON.stringify(newMessageObj));
    }, 375);
  }

  render() {
    console.log('Rendering <App />');
    return (
      <div>
        <MessageList
          messages={ this.state.messages }
        />
        <ChatBar
          currentUser={ this.state.currentUser }
          onNewPost={ this.onNewPost }
        />
      </div>
    );
  }
}

export default App;
