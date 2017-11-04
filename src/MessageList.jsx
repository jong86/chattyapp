import React, { Component } from 'react';
import { Message, MessageSystem } from './Message.jsx';

class MessageList extends Component {
  render() {
    const messages = this.props.messages.map(message => {
      if (message.type === 'incomingMessage') { // Return a regular message with username and content
        return (
          <Message
            key={ message.id }
            username={ message.username } 
            content={ message.content } 
            nameColor={ message.nameColor }
          />
        );
      } else if (message.type === 'incomingNotification') { // Return a notification of name change message
        return (
          <MessageSystem
            key={ message.id }
            content={ message.content } 
          />
        );
      }
    });
      
    return (
      <main className='messages'>
        { messages }
      </main>
    );
  }
}

export default MessageList;