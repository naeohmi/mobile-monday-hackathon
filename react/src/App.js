import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import './App.css';

import Chat from './components/Chat';
import Landing from './components/Landing';
import Navigation from './components/Navigation';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import UserStatus from "./components/UserStatus";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
    }
  }

  userStatusComponent = () => {
    return (
      <UserStatus
        isLoggedIn={this.state.loggedIn}
      />
    );
  }

  landingComponent = () => {
    return (
      <Landing
        logUserName={this.loggingUserName.bind(this)}
      />
    );
  }

  registerComponent = () => {
    return (
      <Register
        setUserName={this.settingUserName.bind(this)}
      />
    );
  }

  chatComponent = () => {
    return (
      <Chat />
    );
  }

  dashboardComponent = () => {
    return (
      <Dashboard />
    );
  }

  loggingUserName(submittedName, submittedPassword) {
    axios.post("http://penpal.mybluemix.net/api/teachers/login", {
      username: submittedName,
      password: submittedPassword
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  settingUserName(signupDataArray) {
    axios.post("http://penpal.mybluemix.net/api/teachers", {
      username: signupDataArray[0],
      email: signupDataArray[1],
      primaryLanguage: signupDataArray[2],
      password: signupDataArray[3],
      timezone: signupDataArray[4],
      studentAge: signupDataArray[5]
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  }

  checkLogin(authPath) {
    if(this.state.isLoggedIn === true) {
      switch(authPath) {
        case "/chat":
          return this.chatComponent();
        case "/dashboard":
          return this.dashboardComponent();
        default:
          return (<Redirect to="/dashboard"/>);
      }
    }

    else {
      switch(authPath) {
        case "/":
          return this.landingComponent();
        case "/register":
          return this.registerComponent();
        default:
          return (<Redirect to="/"/>);
      }
    }
  }

  render() {
    return (
      <Router>
            <Route render={() => this.userStatusComponent()}></Route>
            <Switch>
              <Route path="/" exact render={() => this.checkLogin("/")}></Route>
              <Route path="/register" render={() => this.checkLogin("/register")}></Route>

              <Route path="/chat" render={() => this.checkLogin("/chat")}></Route>
              <Route path="/dashboard" render={() => this.checkLogin("/dashboard")}></Route>
            </Switch>
        </Router>
    );
  }
}