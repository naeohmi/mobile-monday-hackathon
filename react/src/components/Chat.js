import React, { Component } from 'react';
import Config from './config.js';
import watson from './watson';
import Pubnub from 'pubnub';
import PubJr from './PubJr';
import Cookie from 'react-cookies';
import Axios from 'axios';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.Pubnub = undefined;
    this.text = undefined;
    this.state = {
      user: Cookie.load('userId'),
      userToken: Cookie.load('userToken'),
      userLang: Cookie.load("Lang"),
      penpalLang: "",
      input: "",
      final: "",
      result: []
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.checkName = this.checkName.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // console.log("mounted", this.state.result)
    this.channelName = "anthony"
    let init = () => {
      this.Pub = new Pubnub(Config)
      // console.log(this.Pub)
    }
    let subscribe = (channelName) => {
      this.Pub.subscribe({
        channels: [channelName]
      });
      // console.log("subscribed")
    }
    let listen = (self) => {
      this.Pub.addListener({
        status: function (statusEvent) {
          if (statusEvent.category === "PNConnectedCategory") {
            // publishSampleMessage();
          }
        },
        //message is a string of text TODO set as state to render                                                ///////.  listening for messages in the channel
        message: function (message) {
          // console.log("new msg", message);
          // message.message.hasOwnProperty(self.state.userLang)
          let c = Cookie.load("userLang")
          let result = message.message.filter((el, index) => {
            return el.languageType === c
          })
          console.log(result)
          let newData = self.state.result;
          newData.push(result[0].text)
          self.setState({
            result: newData
          })
        },
        presence: function (presenceEvent) {
          // handle presence
        }
      })
    }
    init();
    subscribe(this.channelName);
    listen(this);
  }
  checkName() {
    let y = `http://penpal.mybluemix.net/api/teachers/${Cookie.load('userId')}?access_token=${Cookie.load('userToken')}`
    return Axios.get(y)
      .then(res => {
        console.log(res);
        return res.data.primaryLanguage
      }).catch(err => {
        console.log(err);
      });
  }
  publishText(message) {
    console.log("inside the publish function!!");
    let self = this;

    let publishConfig = {
      channel: self.channelName,
      message: message //array of translations
    }
    this.Pub.publish(publishConfig, function (status, response) {
      // console.log(status, response, "finished publishing");
    })
  }
  //handles the change of state when user types into the input field
  handleChange(e) {
    this.text = e.target.value;
    //sets the state of the input field
    this.setState(state => {
      input: state.input = this.text
    })
  }
  //es7 async function where the await is the promise
  handleSubmit(e) {
    let self = this;
    e.preventDefault();
    async function go() {
      let original = Cookie.load("userLang")
      let foreign = original === "en" ? "es" : "en";
      try {
        let result1 = await watson.changeText(self.state.input, original, foreign)
        let userObj = [
          {
            languageType: original,
            text: self.state.input
          },
          {
            languageType: foreign,
            text: result1.translations[0].translation
          }
        ]
        self.publishText(userObj)
      } catch (err) {
        console.log(err)
      }
    }
    go()
  }
  //loops through the result state and renders the return as an array
  stateLoop() {
    // console.log('stateLoop called!');
    if (this.state.result.length > 0) {
      return this.state.result.map((el, index) => {
        return (
          <PubJr key={index} Lang={this.state.userId} chatText={el} />
        )
      })
    }
    return false;
  }
  render() {
    // console.log(this.state.result)
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
      </div>
    );
  }
}

export default Chat;