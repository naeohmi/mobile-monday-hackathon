import React, { Component } from 'react';
import Chat from './components/Chat';
import Landing from './components/Landing';
import Navigation from './components/Navigation';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <Navigation />
          <Switch>
            <Route path="/" exact component={() => (<Landing

            />)} />
            <Route path="/chat" exact component={() => (<Chat

            />)} />
            <Route path="/signup" exact component={() => (<Register

            />)} />
            <Route path="/dashboard" exact component={() => (<Dashboard

            />)} />
            {/*<Route path="/*" component={() => (<FourOFour />) }/>*/}
            <Footer />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
