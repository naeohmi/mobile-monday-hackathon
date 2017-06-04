import React, { Component } from 'react';
import '../App.css';

export default class UserStatus extends Component {
  renderLogInData() {
    if (this.props.isLoggedIn === true) {
      return <button>Logout</button>;
    }
  }

  render() {
    return (
      <div>
        {this.renderLogInData()}
      </div>
    );
  }
}