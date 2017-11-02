import React, {Component} from 'react';

const uuidv4 = require('uuid/v4');

function imageParser(content) {
  const re = /(https?:\/\/.*?\.(?:png|jpg|gif))/;
  
  let splitContent = content.split(re);

  console.log('splitContent', splitContent);

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

// https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg

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
