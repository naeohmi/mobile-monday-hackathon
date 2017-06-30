import React, { Component } from 'react';
import Chat from './components/Chat';
import Landing from './components/Landing';
import Navigation from './components/Navigation';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import UserStatus from "./components/UserStatus";
import NotFound from "./components/NotFound";
import axios from 'axios';
import Cookie from 'react-cookies';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      registeredUser: [],
      loggedInUser: [],
      userInfo: Cookie.load('PenPal-userInfo'),
      logMessage: ""
    }

    //testing cookie to make sure it loads user profile info when refreshing
    console.log("cookie => ");
    console.log(this.state.userInfo);
  }

  userStatusComponent() {
    return (
      <UserStatus
        isLoggedIn={this.state.isLoggedIn}
        userInfo={this.state.userInfo}
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
      <Chat
        userLoggedIn={this.state.loggedInUser}
        userRegistered={this.state.registeredUser}
        isLoggedIn={this.state.isLoggedIn}
        userInfo={this.state.userInfo}
      />
    );
  }

  dashboardComponent() {
    return (
      <Dashboard
        userLoggedIn={this.state.loggedInUser}
        userRegistered={this.state.registeredUser}
        isLoggedIn={this.state.isLoggedIn}
        userInfo={this.state.userInfo}
      />
    );
  }

  loggingUserName(submittedName, submittedPassword) {
    axios.post(`http://penpal-server.herokuapp.com/auth/login`, {
      username: submittedName,
      password: submittedPassword
    })
      .then(res => {
        //refactored the LoggingUserName >>>  Es7 async   handle the promises
        let self = this;
        async function getCredentials() {
          try {
            let res = await axios.post(`http://penpal-server.herokuapp.com/auth/login`, {
              username: submittedName,
              password: submittedPassword
            })
            Cookie.save('PenPal-userInfo', res.data.user_profile, {
              path: '/'
            })
            self.setState({
              loggedInUser: res.data.user_profile,
              isLoggedIn: res.data.loggedIn,
              logMessage: "",
            });
          }
          catch (err) {
            console.log(err);
          }
        }
        getCredentials();
      })
  };

  logoutUserName() {
    axios.get(`http://penpal-server.herokuapp.com/auth/logout`)
      .then(res => {
        Cookie.remove('PenPal-userInfo', { path: '/' });

        this.setState({
          isLoggedIn: res.data.loggedIn,
          logMessage: ""
        });

      }).catch(err => {
        console.log(err);
      });
  }

  settingUserName(userInfo) {
    axios.post(`http://penpal-server.herokuapp.com/auth/register`, {
      username: userInfo[0],
      email: userInfo[1],
      city: userInfo[2],
      primarylanguage: userInfo[3],
      password: userInfo[4],
      timezone: userInfo[5],
      studentage: userInfo[6]
    })
      .then(res => {
        // WHEN YOU REGISTER SET THIS COOKIE
        Cookie.save('PenPal-userInfo', res.data.user_profile, {
          path: '/'
        })

        this.setState({
          registeredUser: res.data.user_profile,
          isLoggedIn: res.data.loggedIn,
          logMessage: res.data.message
        });

      })
      .catch(err => {
        console.log(err);
      });
  }

  checkLogin(authPath) {
    // CHECK TO SEE IF COOKIES EXIST AND/OR LOGGED IN STATUS IS TRUE
    if (this.state.isLoggedIn === true || this.state.userInfo) {
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
      <Router>
        <div>
          <div className="app-container">
            <Navigation />
            <Route render={() => this.userStatusComponent()}></Route>

            <Switch>
              <Route path="/" exact render={() => this.checkLogin("/")}></Route>
              <Route path="/register" render={() => this.checkLogin("/register")}></Route>

              <Route path="/chat" render={() => this.checkLogin("/chat")}></Route>
              <Route path="/dashboard" render={() => this.checkLogin("/dashboard")}></Route>
              <Route path="/*" component={() => (<NotFound />)} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;