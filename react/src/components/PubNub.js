import React, { Component } from 'react';

import Config from './config';
import Pubnub from 'pubnub';

class PubNub extends Component {

      constructor(props){
            super(props);

            this.state = {
              //leave blank for now
              pubjObj: {},
              message: ""
            }
            this.toChat = this.toChat.bind(this);
      }
      toChat() {
            //pubnub object with built in methods
            this.pubObj = {
            // Pub: new Pubnub(Config),

            channelName: "",

              init: () => {
              this.Pub =  new Pubnub(Config)
              console.log(this.Pub)

                },
              publishText: (message) => {
                    console.log("inside the publish function!!");
                    let self = this;

                    var publishConfig = {
                        channel : self.channelName,
                        message : message                ////////array of translations
                    }
                    this.Pub.publish(publishConfig, function(status, response) {
                        console.log(status, response, "finished publishing");
                    })
              },

              subscribe: (channelName) => {
                 this.Pub.subscribe({
                    channels: [channelName]
                });
                 this.channelName = channelName;
                 console.log("subscribed")
              },

              listen: () => {
                this.Pub.addListener({
                    status: function(statusEvent) {
                        if (statusEvent.category === "PNConnectedCategory") {
                            // publishSampleMessage();

                        }
                    },
                      //message is a string of text TODO set as state to render                                                ///////.  listening for messages in the channel
                    message: function(message) {
                        console.log("New Message!!!!!!", message);
                        this.setState({
                          message
                        })
                    },
                    presence: function(presenceEvent) {
                        // handle presence
                    }
                })
              }
            }
          };
          render() {
            return (
              <div className="pubnub">
                <PubNub />
              </div>
              )
          };

}

export default PubNub;
