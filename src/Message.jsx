import React, { Component } from 'react';

// Generate a unique ID for elements:
const uuidv4 = require('uuid/v4');

// To transform all urls that end in image file extensions into HTML img tags:
function imageParser(content) {
  const re = /(https?:\/\/.*?\.(?:png|jpe?g|gif))/;
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
    const usernameStyle = { // For inline style insertion
      color: this.props.nameColor
    }
    return (
      <div className='message'>
        <span className='message-username' style={ usernameStyle }>
          { this.props.username }
        </span>
        <span className='message-content'>
          { imageParser(this.props.content) }
        </span>
      </div>
    );
  }
}

class MessageSystem extends Component {
  render() {
    return (
      <div className='message system'>
        { this.props.content }
      </div>
    );
  }
}

export { 
  Message,
  MessageSystem
}
