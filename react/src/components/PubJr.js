import React, { Component } from 'react';


 class PubJr extends Component{

  constructor(props){
    super(props)
  }


  render(){
    let st = {
    width: "50%",
    fontSize: "20px",
    margin: "10px"
    }
    if(this.props.chatText){
         return(
             <div className="message" style={st}>{`${this.props.Lang}: ${this.props.chatText}`}</div>
          )
    }else {
        return(
             <div><h1> Lest start chatting </h1></div>
          )
    }

  }





}

export default PubJr;
