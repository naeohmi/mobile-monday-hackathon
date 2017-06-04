import React, { Component } from 'react';
import Config from './config.js';
// import Translate from './Translate';
import watson from './watson';
// import PubNub from './PubNub';
import Pubnub from 'pubnub';
import PubJr from './PubJr';
import Cookie from 'react-cookies';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.Pubnub = undefined;
    this.text = undefined;
    this.state = {
      user: Cookie.load('userId'),
      userLang: "",
      input: "",
      final: "",
      result: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.finalState = this.finalState.bind(this);
  }

  componentDidMount(){
        console.log("mounted")
           this.channelName = "anthony"
           let init = () => {
              this.Pub =  new Pubnub(Config)
              console.log(this.Pub)
              }
            let subscribe = (channelName) => {
                 this.Pub.subscribe({
                    channels: [channelName]
                });

                 console.log("subscribed")
              }
             let listen = (self) => {

                this.Pub.addListener({
                    status: function(statusEvent) {
                        if (statusEvent.category === "PNConnectedCategory") {
                            // publishSampleMessage();

                        }
                    },
                      //message is a string of text TODO set as state to render                                                ///////.  listening for messages in the channel
                    message: function(message) {
                        console.log("New Message!!!!!!", message);

                        if(message.hasOwnProperty(self.state.userLang)){
                           self.setState((prevState, props) => {
                          return {result: prevState.result.push(message)};
                          });
                        }

                    },
                    presence: function(presenceEvent) {
                        // handle presence
                    }
                })
              }

                init()
                subscribe(this.channelName)
                listen(this)

  }


   publishText(message){
                    console.log("inside the publish function!!");
                    let self = this;

                    let publishConfig = {
                        channel : self.channelName,
                        message : message                ////////array of translations
                    }
                    this.Pub.publish(publishConfig, function(status, response) {
                        console.log(status, response, "finished publishing");
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
  //when user clicks the submit button - updates the state
  handleSubmit(e) {
    e.preventDefault();
    //initializes the
    watson.changeText(this.state.input, this.state.userLang)
      .then(data => {
        let userObj = {
          native: this.state.input,
          foriegn: data.translations[0].translation
        }
        let newData = this.state.result;
        newData.push(data.translations[0].translation)
        // console.log(newData);

        //  console.log(this.state.input)
        // this.setState((prevState) => {
        //   result: newData
        // })

        this.publishText(userObj)
      })
  }


  //loops through the result state and renders the return as an array
  stateLoop() {
    console.log('stateLoop called!!!');
    if (this.state.result.length > 0) {
        return this.state.result.map((el, index) => {
          return  <PubJr key={index} chatText={el}/>
        })
    }
    return false
  }

  render() {
    return (
      <div className="chat-container">
          {this.stateLoop()}

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

      </div>
    );
  }
}

export default Chat;
