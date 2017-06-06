import React, { Component } from 'react';
import Config from './config';
import Pubnub from 'pubnub';
import PubJR from './PubJr';

class PubNub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //leave blank for now
      pubjObj: {},
      myArray: [],
      message: ""
    }
    this.toChat = this.toChat.bind(this);
  }
  render() {
    console.log()
    return (
      <div className="pubnub">
        <PubJR chatText={this.props.chatArray} />
      </div>
    )
  };
}

export default PubNub;