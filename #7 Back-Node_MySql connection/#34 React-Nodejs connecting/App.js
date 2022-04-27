// import React, { Component } from 'react'
// import './App.css';

// 리액트에서 노드로 값 보내기
// export default class App extends Component {
//   state = {
//     id : "",
//   }

//   handleChange =(e)=>{
//     this.setState({
//       [e.target.name] : e.target.value,
//     });
//   }

//   submitId = ()=>{
//     const post ={
//       plzid : this.state.id,
//     };
   
//     fetch("http://localhost:3001/idplz", {
//       method : "post", // 통신방법
//       headers : {
//         "content-type" : "application/json",
//       },
//       body : JSON.stringify(post),
//     })
//   };
// 노드에서 리액트로 값 보내기
// export default class App extends Component {
//   state = {
//     id : "",
//   }

//   handleChange =(e)=>{
//     this.setState({
//       [e.target.name] : e.target.value,
//     });
//   }

//   submitId = ()=>{
//     const post ={
//       plzid : this.state.id,
//     };
   
//     fetch("http://localhost:3001/idplz", {
//       method : "post", // 통신방법
//       headers : {
//         "content-type" : "application/json",
//       },
//       body : JSON.stringify(post),
//     })
//     .then((res)=>res.json())
//     .then((json)=>{
//       this.setState({
//         id : json.text,
//       });
//     });
//   };

//   render() {
//     return (
//       <div>
//         <input onChange={this.handleChange} name ="id"/>
//         <button onClick = {this.submitId}>Submit</button>
//         <h1>{this.state.id}</h1>
//       </div>
//     )
//   }
// }

// 노드에서 리액트로 값 보내주기
import React, { Component } from 'react'
import './App.css';
export default class App extends Component {
  state = {
    testbody : "",
    // data : "",
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
        <h3>{this.state.data}</h3> 
         <button onClick={this.onCall}>가져오기</button> 
      </div>
    )
  }
}