import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      username: this.props.currentUser.name,
      prevUsername: undefined
    }
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeContent(event) {
    this.setState({
      content: event.target.value
    })
  }

  onChangeUsername(event) {
    this.setState({
      username: event.target.value
    })
  }

  onSubmit(event) {
    if (event.charCode === 13) {

      if (!!this.state.prevUsername && this.state.username !== this.state.prevUsername) {
        this.props.onNewPost(`${this.state.prevUsername} has changed their name to ${this.state.username}`, null, 'postNotification');
      }

      this.props.onNewPost(this.state.content, this.state.username, 'postMessage');
      this.setState({
        content: '',
        prevUsername: this.state.username
      })
    }
  }

  render() {
    console.log('Rendering <ChatBar />');
    return (
      <footer className='chatbar'>
        <input 
          className='chatbar-username'
          placeholder='Type you name here'
          onChange={ this.onChangeUsername }
          value={ this.state.username }
        />
        <input
          className='chatbar-message'
          placeholder='Type a message and hit ENTER'
          onKeyPress={ this.onSubmit }
          onChange={ this.onChangeContent }
          value={ this.state.content }
        />
      </footer>
    );
  }
}

export default ChatBar;