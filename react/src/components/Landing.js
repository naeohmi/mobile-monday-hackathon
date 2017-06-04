import React, { Component } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Route, NavLink } from 'react-router-dom';
import '../App.css';

export default class Landing extends Component {
  checkUserData() {
    this.props.logUserName(
      this.refs.username.value,
      this.refs.password.value
    );
  }

  render() {
    return (
      <div>
        <div> 
          <h3>Welcome to PenPal!</h3>
          <input type="text" placeholder="username" ref="username"/>
          <input type="password" placeholder="password" ref="password"/>      

          <NavLink to="/signup">Don't have an account? Sign Up!</NavLink><br/>
          <button type="button" onClick={() => this.checkUserData()}>Log In</button>

        </div>
      </div>
    );
  }
}