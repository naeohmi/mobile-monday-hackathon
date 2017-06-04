import React, { Component } from 'react';
import Config from './config.js';
import Pubnub from 'pubnub';
import Translate from './Translate';
import watson from './watson';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.Pubnub = undefined;
    this.text = undefined;
    this.state = {
      input: "",
      final: "",
      result: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.finalState = this.finalState.bind(this);
  }
  //handles the change of state when user types into the input field
  handleChange(e) {
    this.text = e.target.value;
    //sets the state of the input field
    this.setState(state => {
      input: state.input = this.text
    })
  }
  //when user clicks the submit button - updates the state
  handleSubmit(e) {
    e.preventDefault();
    //initializes the 
    watson.changeText(this.state.input)
      .then(data => {
        let newData = this.state.result;
        newData.push(data.translations[0].translation)
        // console.log(newData);

        //  console.log(this.state.input)
        this.setState((prevState) => {
          { result: newData }
        })
      })
  }
  //loops through the result state and renders the return as an array
  stateLoop() {
    // console.log('finalState');
    if (this.state.result) {
      return this.state.result.map((el, index) => {
        console.log(el)
        return <h1 key={index}> {el} </h1>
      })
    }
    return false
  }

  render() {
    return (
      <div className="chat-container">
        <form
          onSubmit={this.handleSubmit.bind(this)}
          className="chat-form"
        >
          <label className="chat-label">
            <input
              type="text"
              value={this.state.text}
              onChange={(e) => this.handleChange(e)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.stateLoop()}
      </div >
    );
  }
}

export default Chat;