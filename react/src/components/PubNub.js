import React, { Component } from 'react';
import Config from './config';
import Pubnub from 'pubnub';
import PubJr from './PubJr';

class PubNub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //leave blank for now
      pubjObj: {},
      myArray: [],
      message: ""
    }
  }
  render() {
    console.log()
    return (
      <div className="pubnub">
        <PubJr chatText={this.props.chatArray} />
      </div>
    )
  };
}

export default PubNub;