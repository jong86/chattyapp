import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super();

    this.state = {
      content: ''
    }

    this.onContent = this.onContent.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
    this.onClickButton = this.onClickButton.bind(this);
  }

  onContent(event) {
    this.setState({
      content: event.target.value
    })
  }

  onSubmit(event) {
    if (event.charCode === 13) {
      console.log("from ChatBar component:", this.state.content);
      this.props.onNewPost(this.state.content);
      this.setState({
        content: ''
      })
    }
  }

  onClickButton(event) {
    console.log(this.state.content);
  }

  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Type you name here" onChange={ this.onContent } value={ this.props.currentUser.name } />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={ this.onSubmit } onChange={ this.onContent } value={ this.state.content } />
        <button onClick={ this.onClickButton }></button>
      </footer>
    );
  }
}

export default ChatBar;