import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand"><h1>Chatty</h1></a>
        <span className="num-users">{this.props.numUsers} users online</span>
      </nav>
    );
  }
}

export default NavBar;