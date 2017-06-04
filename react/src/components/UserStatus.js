import React, { Component } from 'react';
import '../App.css';
// if the user is logged in then the log out button will appear
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