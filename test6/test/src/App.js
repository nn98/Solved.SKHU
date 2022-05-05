import React, { Component } from 'react'
import './App.css';
export default class App extends Component {
  state = {
    testbody : "",
    key : [],
    data : [],
  }

  handleChange =(e)=>{
    this.setState({
      [e.target.name] : e.target.value,
    });
  }

  submitId = ()=>{
    const post ={
      test : this.state.testbody,
    };
   
    fetch("http://localhost:3306/idplz", {
      method : "post", // 통신방법
      headers : {
        "content-type" : "application/json",
      },
      body : JSON.stringify(post),
    })
    .then((res)=>res.json())
    .then((json)=>{
      this.setState({
        testbody : json.text,
      });
    });
  };
  onCall =()=>{
    fetch("http://localhost:3306/callbody",{
      method:"post",
      headers : {
        "content-type" : "application/json",
      },
      body : JSON.stringify(),
    })
    .then((res)=>res.json())
    .then((json)=>{
      this.setState({
        key : json.test_key,
        data : json.test_body,
      });
    });
  };
  render() {
    return (
      <div>
        <input onChange={this.handleChange} name ="testbody"/>
        <button onClick = {this.submitId}>Submit</button>
        <h1>{this.state.testbody}</h1>
        <br/><br/><br/><br/><br/>
        <h2>데이터가져오기</h2>
        <h3>{this.state.key}</h3>
        <h3>{this.state.data}</h3>
        <button onClick={this.onCall}>가져오기</button>
      </div>
    )
  }
}