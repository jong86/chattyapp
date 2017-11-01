import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


const uuidv4 = require('uuid/v4');


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob'},
      messages: [] // messages coming from server are stored here as they arrive
    }
    
    this.socket = new WebSocket('ws://localhost:3001');
    
    this.onNewPost = this.onNewPost.bind(this);
  }
  
  componentDidMount() {
    this.socket.onmessage = (event) => {
      console.log("this.socket.onmessage:", JSON.parse(event.data));
      this.state.messages.push(JSON.parse(event.data));
    };
  }

  onNewPost(content) {
    console.log('from App component:', content);
    
    setTimeout(() => {

      console.log('Simulating incoming message');
      
      const newMessage = {
        id: uuidv4(),
        username: 'Bob',
        content: content
      };
      const messages = this.state.messages.concat(newMessage);

      console.log("content before send:", content);

      this.socket.send(JSON.stringify(newMessage));

      message_id++;
      this.setState({messages: messages});
      
    }, 375);
  }

  render() {
    console.log("Rendering <App />");
    return (
      <div>
        <MessageList messages={ this.state.messages } />
        <ChatBar currentUser={ this.state.currentUser } onNewPost={ this.onNewPost } />
      </div>
    );
  }
}

export default App;
