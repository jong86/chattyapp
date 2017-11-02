import React, {Component} from 'react';
import {Message, MessageSystem} from './Message.jsx';

class MessageList extends Component {
  render() {
    console.log('Rendering <MessageList />');
    const messages = this.props.messages.map(message => {
      if (message.type === 'incomingMessage') {
        return (
          <Message
            key={ message.id }
            username={ message.username } 
            content={ message.content } 
            nameColor={ message.nameColor }
          />
        );
      } else if (message.type === 'incomingNotification') {
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