import React, { Component } from 'react';


 class PubJr extends Component{

  constructor(props){
    super(props)
  }


  render(){
    if(this.props.chatText){
         return(
             <div>{`Hi ${this.props.chatText}`}</div>
          )
    }else {
        return(
             <div><h1> Lest start chatting </h1></div>
          )
    }

  }





}

export default PubJr;
