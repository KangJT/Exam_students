import React, { Component } from "react";
import Cookie from "../http/utils";
import { Redirect } from "dva/router";

function hoc(Comp) {
  return class extends Component {
    render() {
      if (Cookie.get("userid")) {
        return <Comp routers={this.props.routers}/>;
      } else {
        return <Redirect to="/" />;
      }
    }
  };
}
export default hoc;
