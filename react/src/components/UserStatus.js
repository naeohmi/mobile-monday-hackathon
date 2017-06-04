import React, { Component } from 'react';
import '../App.css';

export default class UserStatus extends Component {
  renderLogInData() {
    if (this.props.isLoggedIn === true) {
      return <button onClick={() => this.props.logout()}>Logout</button>;
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