import React, { Component } from 'react';
import Chat from './components/Chat';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Chat />
        Pen Pals
      </div>
    );
  }
}

export default App;
