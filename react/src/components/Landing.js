import React, { Component } from 'react'; // eslint-disable-next-line
import { BrowserRouter as Route, NavLink } from 'react-router-dom';
import '../App.css';

class Landing extends Component {
  checkUserData() {
    this.props.logUserName(
      this.refs.username.value,
      this.refs.password.value
    );
  }

  render() {
    return (
      <div>
        <div className="landing">
          <div className="text-cont">
            <h3>Welcome to PenPal!</h3>
            <input type="text" placeholder="username" ref="username" className="form-input" />
            <input type="password" placeholder="password" ref="password" className="form-input" />
            <br />
            <NavLink to="/register" className="toggle-auth-type">Click to Sign Up!</NavLink><br />
            <button type="button" onClick={() => this.checkUserData()} className="submit-btn">Log In</button>
          </div>
        </div>
        <div className="img-cont">
          <img src="/images/main-kids.jpg" alt="kids" />
        </div>
      </div>
    );
  }
}
export default Landing;
