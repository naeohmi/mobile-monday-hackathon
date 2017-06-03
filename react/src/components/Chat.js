import React, { Component } from 'react';
import Config from './config.js';
import Pubnub from 'pubnub';
import Translate from './Translate';
import side from './side';

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
    this.componentDidMount = this.componentDidMount.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.finalState = this.finalState.bind(this);
  }

  componentDidMount() {
    // let pubNubVar = new Pubnub(Config)
    // this.PubNub = Pubnub.init({
    //   publish_key: Config.publishKey,
    //   subscribe_key: Config.subscribeKey,
    //   ssl: true,
    // });
  }

  handleChange(e) {
    this.text = e.target.value
    this.setState(state => {
      input: state.input = this.text
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    side.changeText(this.state.input)
      .then(data => {
        let newData = this.state.result;
        newData.push(data.translations[0].translation)
        // console.log(newData);

        //  console.log(this.state.input)
        this.setState((prevState) => {
          {result: newData}
        })
      })
  }

  finalState() {
        // console.log('finalState');
        if(this.state.result) {
          return this.state.result.map((el, index) => {
            console.log(el)
            return <h1 key={index}> {el} </h1>
          })
        }
    return false
      }

  render() {
        return(
      <div className= "App" >

      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>
          talk:
          <input type="text" value={this.state.text} onChange={(e) => this.handleChange(e)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
            {this.finalState() }
      </div >
    );
  }
}

export default Chat;