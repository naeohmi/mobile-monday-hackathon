import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import Cookie from 'react-cookies';

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
      token: Cookie.load('userToken'),
      userLang: Cookie.load('Lang'),
      userId: Cookie.load('userId')
    }
  }

  userStatusComponent() {
    return (
      <UserStatus
        isLoggedIn={this.state.isLoggedIn}
        token={this.state.token}
        userLang={this.state.userLang}
        userId={this.state.userId}
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
            
            />
    );
  }

  dashboardComponent() {

    return (
      <Dashboard userLoggedIn={this.state.loggedInUser}
                 userRegistered={this.state.registeredUser}
                 isLoggedIn={this.state.isLoggedIn}
        
                 />
    );
  }

  loggingUserName(submittedName, submittedPassword) {
    axios.post(`http://penpal.mybluemix.net/api/teachers/login`, {
      username: submittedName,
      password: submittedPassword
    }).then((res) => {
      Cookie.save('userToken', res.data.id, { path: '/' });
      Cookie.save('userId', res.data.userId, { path: '/' });

      this.setState({ loggedInUser: res.data, isLoggedIn: true });
    }).catch((err) => {
      console.log(err);
    });
  }

  logoutUserName() {
    Cookie.remove('userToken', { path: '/' });
    Cookie.remove('Lang', { path: '/' });
    Cookie.remove('userId', { path: '/' });
    this.setState({ isLoggedIn: false });
    //console.log("logout clicked");
    axios.post("http://penpal.mybluemix.net/api/teachers/logout?access_token=" + this.state.token)
    .then((res) => {
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
      // WHEN YOU REGISTER SET THESE TWO COOKIES
      Cookie.save('Lang', res.data.primaryLanguage, { path: '/' });
      Cookie.save('userId', res.data.id, { path: '/' })
      console.log(res);
      this.setState({ registeredUser: res.data, isLoggedIn: true });
      //console.log(this.state.registeredUser);
    }).catch((err) => {
      console.log(err);
    });
  }

  checkLogin(authPath) {
    // CHECK TO SEE IF COOKIES EXIST AND/OR LOGGED IN STATUS IS TRUE
    if (this.state.isLoggedIn === true || this.state.userLang || this.state.token) {
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

  /*getUserID(){
    let id;
    //console.log(this.state.userId)
    if(this.state.userId){
      console.log("first");
      id = this.state.userId;
    } else if(this.state.registeredUser.id){
      console.log("second");
      id = this.state.registeredUser.id;
    } else {
      console.log("third");
      id = this.state.loggedInUser.userId;
    }
    return id;
  }*/

  getLanguage(){
    axios.get('http://penpal.mybluemix.net/api/teachers/' + this.getUserID() + '?access_token=' + this.state.token)
         .then((res) => {
           console.log(res);
         }).catch((err) => {
           console.log(err);
         })
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
            {/*<button onClick={()=> this.getLanguage()}>getLang</button>*/}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;