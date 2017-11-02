import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

// Generates a UUID:
const uuidv4 = require('uuid/v4');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [], // messages coming from server are stored here as they arrive
      numUsers: 0
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
        case 'incomingNotification':
          console.log('Incoming message/notification', newMessageObj);
          this.setState({messages: this.state.messages.concat([newMessageObj]) });
          break;
        case 'incomingNumUsers':
          console.log(newMessageObj.content);
          this.setState({numUsers: newMessageObj.content});
          break;
        default:
          console.error("Unknown event type:", newMessageObj.type);
      }

    }
  }

  onNewPost(content, username, type, nameColor) {
    setTimeout(() => {
      const newMessageObj = {
        id: uuidv4(),
        username,
        content,
        type,
        nameColor
      };
      this.socket.send(JSON.stringify(newMessageObj));
    }, 375);
  }

  render() {
    console.log('Rendering <App />');
    return (
      <div>
        <NavBar
          numUsers={ this.state.numUsers }
        />
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
