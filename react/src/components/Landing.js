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
      <div className="landing">
          <h3 className="tagline">Welcome to PenPal!</h3>
          <input type="text" placeholder="username" ref="username" className="form-input"/>
          <input type="password" placeholder="password" ref="password" classame="form-input"/>      

          <NavLink to="/signup" className="toggle-auth-type">Don't have an account? Sign Up!</NavLink><br/>
          <button type="button" onClick={() => this.checkUserData()} className="submit-btn">Log In</button>
      </div>
    );
  }
}