import React from "react";
import routerMap from "../../routers/mapRoutersToProps";
import "./style.css";

class Show extends React.Component {
  constructor() {
    super();
    this.state = {
      num: 0,
      list: [
        {
          name: "展示用户",
          path: "/exam/show/user"
        },
        {
          name: "展示类型",
          path: "/exam/show/identity"
        },
        {
          name: "api接口权限",
          path: "/exam/show/api"
        },
        {
          name: "身份与api接口的关系",
          path: "/exam/show/userapi"
        }
      ]
    };
  }
  render() {
    return (
      <div className="wy_showbox">
        <div className="wy_shownav">
          <span>展示信息</span>
          <ul className="wy_shownavs">
            {this.state.list.map((item, index) => {
              return (
                <li
                  key={index}
                  className={this.state.num === index?'show_action':''}
                  onClick={() => {
                    this.navigates(item.path,index);
                  }}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="wy_routerbox">{routerMap(this.props.routers)}</div>
      </div>
    );
  }
  navigates = (type,num) => {
    this.setState({num})
    this.props.history.push(type);
  };
}

export default Show;
