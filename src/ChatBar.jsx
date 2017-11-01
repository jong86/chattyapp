import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      username: this.props.currentUser.name
    }

    this.onChangeMessage = this.onChangeMessage.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
  }

  onChangeMessage(event) {
    this.setState({
      message: event.target.value
    })
  }

  onChangeUsername(event) {
    this.setState({
      username: event.target.value
    })
  }

  onSubmit(event) {
    if (event.charCode === 13) {
      console.log('from ChatBar component:', this.state.message, 'from:', this.state.username);
      this.props.onNewPost(this.state.message, this.state.username);
      this.setState({
        message: ''
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
          onChange={ this.onChangeMessage }
          value={ this.state.message }
        />
      </footer>
    );
  }
}

export default ChatBar;