import React from "react";
import { Menu, Icon } from "antd";
import { Link } from "dva/router";
import "./sider.css";

const SubMenu = Menu.SubMenu;

class Siders extends React.Component {
  rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4", "sub5"];

  state = {
    openKeys: JSON.parse(window.localStorage.getItem("open"))?[
      JSON.parse(window.localStorage.getItem("open"))[
        JSON.parse(window.localStorage.getItem("open")) && JSON.parse(window.localStorage.getItem("open")).length - 1
      ]
    ] : ["sub1"]
  };

  onOpenChange = openKeys => {
    window.localStorage.setItem("open", JSON.stringify(openKeys));
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };
  sel = ({ key }) => {
    window.localStorage.setItem("key", key);
  };
  render() {
    return (
      <div className="z_menu">
        <Menu
          mode="inline"
          openKeys={this.state.openKeys}
          onOpenChange={this.onOpenChange}
          style={{ width: 256 }}
          defaultSelectedKeys={[window.localStorage.getItem("key")] || [1]}
          onSelect={this.sel}
        >
           <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="form" />
                <span>试题管理</span>
              </span>
            }
          >
            <Menu.Item key="1">
              <Link to="/exam/questions">添加试题</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/exam/examType">试题分类</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/exam/getQuestionsType">查看试题</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="profile" />
              <span>用户管理</span>
            </span>
          }
        >
          <Menu.Item key="13"><Link to="/exam/role">用户角色</Link></Menu.Item>
          <Menu.Item key="14"><Link to="/exam/show/user">信息展示</Link></Menu.Item>
        </SubMenu>
       
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon type="profile" />
              <span>考试管理</span>
            </span>
          }
        >
          <Menu.Item key="15">
            <Link to="/exam/creatTest">添加考试</Link></Menu.Item>
          <Menu.Item key="16">
            <Link to="/exam/examination">试卷列表</Link>
          </Menu.Item>
          <Menu.Item key="17">
            <Link to="/exam/testlist">考试列表</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="profile" />
              <span>班级管理</span>
            </span>
          }
        >
          <Menu.Item key="9">
            <Link to="/exam/subject">班级管理</Link>
          </Menu.Item>
          <Menu.Item key="11">
            <Link to="/exam/classmen">教室管理</Link>
          </Menu.Item>
          <Menu.Item key="12">
            <Link to="/exam/student">学生管理</Link>
          </Menu.Item>
          <Menu.Item key="13">
            <Link to="/exam/addClass">添加教室</Link>
          </Menu.Item>
        </SubMenu>

        
      </Menu>
      </div>
    );
  }

  componentWillMount() {
    //window.localStorage.setItem("open", JSON.stringify(["sub1"]));
  }
}

export default Siders;
