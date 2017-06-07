import React, { Component } from 'react';
import '../App.css';

export default class UserStatus extends Component {
  renderLogInData() {
    if (this.props.isLoggedIn === true || this.props.userInfo) {
        return <button className="btn btn-danger btn-xs" onClick={() => this.props.logout()}>logout</button>;
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