import React, { Component } from "react";
import "./index.css";
class Classdetail extends Component {
  render() {
    let cl = this.props.location.search.split("=")[1];
    return (
      <div className="z_wrap">
        <div className="img">
          <img src="/pic.png" alt="" />
        </div>
        <div className="con">
          <h2 style={{textAlign:'center',fontSize:40}}>{cl}</h2>
          <ul>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
            <li>姓名</li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Classdetail;
