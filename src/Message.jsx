import React, {Component} from 'react';

class Message extends Component {
  render() {
    return (
      <div className="message">
        <span className="message-username">
          { this.props.username }
        </span>
        <span className="message-content">
          { this.props.content }
        </span>
      </div>
    );
  }
}

class MessageSystem extends Component {
  render() {
    console.log("Rendering <Message />");
    return (
      <div className="message system">
        { this.props.content }
      </div>
    );
  }
}

export { 
  Message,
  MessageSystem
}
