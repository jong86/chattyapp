import React, {Component} from 'react';

const uuidv4 = require('uuid/v4');

function imageParser(content) {
  const re = /(https?:\/\/.*?\.(?:png|jpg|gif))/;
  const splitContent = content.split(re);
  return splitContent.map(element => {
    if (re.test(element)) {
      return (
        <img
          key={ uuidv4() }
          src={ element }
        />
      );
    }
    return element;
  })
}

class Message extends Component {
  render() {
    const usernameStyle = {
      color: this.props.nameColor
    }
    return (
      <div className="message">
        <span className="message-username" style={ usernameStyle }>
          { this.props.username }
        </span>
        <span className="message-content">
          { imageParser(this.props.content) }
        </span>
      </div>
    );
  }
}

class MessageSystem extends Component {
  render() {
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
