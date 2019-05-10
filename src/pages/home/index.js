import React from "react";
import "./index.css";
import { Layout } from "antd";
import "antd/dist/antd.css";
import Siders from "../../components/sider/sider";
import mapRouter from "@/routers/mapRoutersToProps";
import hoc from "../../hoc";
import http from "../../utils/fetch";
const { Header, Content, Sider } = Layout;

class Index extends React.Component {
  state = {
    username: "用户名"
  };
  render() {
    return (
      <div className="z_wrap">
        <Layout>
          <Header>
            <img src="/login.png" alt="" />
            <p>
              <i>
                <img src="/u=681742560,2937733854&fm=26&gp=0.jpg" alt="" />
              </i>
              <span>{this.state.username}</span>
            </p>
          </Header>
          <Layout>
            <Sider>
              <Siders />
            </Sider>
            <Content>{mapRouter(this.props.routers)}</Content>
          </Layout>
        </Layout>
      </div>
    );
  }
  componentDidMount() {
    http.get("/user/userInfo").then(data => {
      if (data.data&&data.data.user_name) {
        this.setState({
          username: data.data.user_name
        });
      }
    });
  }
}

export default hoc(Index);
