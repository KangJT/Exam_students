import React from "react";
import { Spin } from "antd";
import "./style.css";
class Loading extends React.Component {
  constructor() {
    super();
    this.state = {
      istrue: false
    };
  }
  render() {
    return (
      <div className="wy_loadbox">
        {this.props.open ? (
          <div className="wy_loading">
            <div className="wy_loadingbox">
              <Spin spinning={this.props.open} size="large" />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default Loading;
