import React, {Component} from 'react';
import randomColor from '../scripts/helpers.js';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      username: this.props.currentUser.name,
      prevUsername: 'Anonymous',
      nameColor: randomColor()
    }
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
    this.onSubmitName = this.onSubmitName.bind(this);
    this.isSaveDisabled = this.isSaveDisabled.bind(this);
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
      this.props.onNewPost(this.state.content, this.state.username, 'postMessage', this.state.nameColor);
      this.setState({
        content: ''
      })
    }
  }
  
  onSubmitName() {
    // Name change submission...
    console.log('click');
    this.props.onNewPost(`${this.state.prevUsername} has changed their name to ${this.state.username}`, null, 'postNotification', '#000');
    this.setState({
      prevUsername: this.state.username
    })
  }

  isSaveDisabled() {
    if (this.state.username === this.state.prevUsername) {
      return <button className='chatbar-savename' disabled>save</button>;
    } else {
      return <button className='chatbar-savename' onClick={ this.onSubmitName }>save</button>;
    }
  }

  render() {
    return (
      <footer className='chatbar'>
        <input 
          className='chatbar-username'
          placeholder='Type your name here'
          onChange={ this.onChangeUsername }
          value={ this.state.username }
        />
        {this.isSaveDisabled()}
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