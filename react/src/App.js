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
import NotFound from "./components/NotFound";


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      registeredUser: [],
      loggedInUser: [],
      token: "",
    }
  }


  userStatusComponent() {
    return (
      <UserStatus
        isLoggedIn={this.state.isLoggedIn}
        logout={this.logoutUserName.bind(this)}
      />
    );
  }
  landingComponent() {
    return (
      <Landing logUserName={this.loggingUserName.bind(this)} />
    );
  }
  registerComponent() {
    return (
      <Register setUserName={this.settingUserName.bind(this)} />
    );
  }

  chatComponent() {
    return (
      <Chat userLoggedIn={this.state.loggedInUser}
            userRegistered={this.state.registeredUser}
            isLoggedIn={this.state.isLoggedIn}
            token={this.state.token} />
    );
  }

  dashboardComponent() {

    return (
      <Dashboard userLoggedIn={this.state.loggedInUser}
                 userRegistered={this.state.registeredUser}
                 isLoggedIn={this.state.isLoggedIn}
                 token={this.state.token} />
    );
  }

  loggingUserName(submittedName, submittedPassword) {
    axios.post(`http://penpal.mybluemix.net/api/teachers/login`, {
      username: submittedName,
      password: submittedPassword
    }).then((res) => {
      console.log(res);
      this.setState({ loggedInUser: res.data, token: res.data.id, isLoggedIn: true });
      //console.log(this.state.loggedInUser);
    }).catch((err) => {
      console.log(err);
    });
  }

  logoutUserName() {
    axios.get("http://penpal.mybluemix.net/api/teachers/logout", {
      access_token: this.state.token
    }).then((res) => {
        console.log(res);
      }).catch(function (err) {
        console.log(err);
      });
  }

  settingUserName(userInfo) {
    axios.post("http://penpal.mybluemix.net/api/teachers", {
      username: userInfo[0],
      email: userInfo[1],
      city: userInfo[2],
      primaryLanguage: userInfo[3],
      password: userInfo[4],
      timezone: userInfo[5],
      studentAge: userInfo[6]
    }).then((res) => {
      console.log(res);
      this.setState({ registeredUser: res.data, isLoggedIn: true });
      //console.log(this.state.registeredUser);
    }).catch((err) => {
      console.log(err);
    });
  }

  checkLogin(authPath) {
    if (this.state.isLoggedIn === true) {
      switch (authPath) {
        case "/chat":
          return this.chatComponent();
        case "/dashboard":
          return this.dashboardComponent();
        default:
          return (<Redirect to="/dashboard" />);
      }
    }
    else {
      switch (authPath) {
        case "/":
          return this.landingComponent();
        case "/register":
          return this.registerComponent();
        default:
          return (<Redirect to="/" />);
      }
   }
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Navigation />
            <Route render={() => this.userStatusComponent()}></Route>
            <Switch>
              <Route path="/" exact render={() => this.checkLogin("/")}></Route>
              <Route path="/register" render={() => this.checkLogin("/register")}></Route>

              <Route path="/chat" render={() => this.checkLogin("/chat")}></Route>
              <Route path="/dashboard" render={() => this.checkLogin("/dashboard")}></Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;