import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const data = {
  currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: 'Bob',
      content: 'Has anyone seen my marbles?',
    },
    {
      id: 2,
      username: 'Anonymous',
      content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
    },
  ]

};

let message_id = data.messages.length + 1;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = data;
    this.socket = new WebSocket('ws://localhost:3001');

    this.onNewPost = this.onNewPost.bind(this);
  }

  componentDidMount() {
    this.socket.onmessage = function (event) {
      console.log(event.data);
    };
  }

  onNewPost(content) {
    console.log('from App component:', content);
    setTimeout(() => {
      console.log('Simulating incoming message');
      const newMessage = {
        id: message_id,
        username: 'Bob',
        content: content
      };
      const messages = this.state.messages.concat(newMessage);

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
