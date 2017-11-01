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

    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.addEventListener('message', event => {
      const newMessageObj = JSON.parse(event.data);

      this.setState({messages: this.state.messages.concat([newMessageObj]) });

    });
  }

  onNewPost(message, username) {
    
    setTimeout(() => {

      const newMessageObj = {
        id: uuidv4(),
        username: username,
        message: message
      };

      this.socket.send(JSON.stringify(newMessageObj));

      
    }, 375);
  }

  render() {
    console.log("Rendering <App />");
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
