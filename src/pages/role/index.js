import React from "react";
import {connect} from 'dva'
import "./style.css";
import http from '../../http'

import { Table, Divider } from "antd";



const columns = [
  {
    title: "角色名称",
    dataIndex: "username",
    key: "name",
    render: text => <span>{text}</span>
  },
  {
    title: "备注",
    dataIndex: "remark",
    key: "age"
  },
  {
    title: "创建时间",
    dataIndex: "createtime",
    key: "createtime"
  },
  {
    title: "操作时间",
    dataIndex: "actiontime",
    key: "actiontime"
  },
  {
    title: "操作",
    key: "action",
    render: (text, record) => (
      <span>
        <a href="/#/exam/add">菜单权限</a>
      </span>
    )
  }
];

const data = [
  {
    key: "1",
    username: "1608A",
    remark: "测试权限按钮和数据权限",
    createtime: "2017-10-03 19:23:12",
    actiontime: "2017-10-03 19:23:12"
  },{
    key: "2",
    username: "1608A",
    remark: "测试权限按钮和数据权限",
    createtime: "2017-10-03 19:23:12",
    actiontime: "2017-10-03 19:23:12"
  },{
    key: "3",
    username: "1608A",
    remark: "测试权限按钮和数据权限",
    createtime: "2017-10-03 19:23:12",
    actiontime: "2017-10-03 19:23:12"
  },{
    key: "4",
    username: "1608A",
    remark: "测试权限按钮和数据权限",
    createtime: "2017-10-03 19:23:12",
    actiontime: "2017-10-03 19:23:12"
  },{
    key: "5",
    username: "1608A",
    remark: "测试权限按钮和数据权限",
    createtime: "2017-10-03 19:23:12",
    actiontime: "2017-10-03 19:23:12"
  },{
    key: "6",
    username: "1608A",
    remark: "测试权限按钮和数据权限",
    createtime: "2017-10-03 19:23:12",
    actiontime: "2017-10-03 19:23:12"
  },{
    key: "7",
    username: "1608A",
    remark: "测试权限按钮和数据权限",
    createtime: "2017-10-03 19:23:12",
    actiontime: "2017-10-03 19:23:12"
  },{
    key: "8",
    username: "1608A",
    remark: "测试权限按钮和数据权限",
    createtime: "2017-10-03 19:23:12",
    actiontime: "2017-10-03 19:23:12"
  },{
    key: "9",
    username: "1608A",
    remark: "测试权限按钮和数据权限",
    createtime: "2017-10-03 19:23:12",
    actiontime: "2017-10-03 19:23:12"
  },{
    key: "10",
    username: "1608A",
    remark: "测试权限按钮和数据权限",
    createtime: "2017-10-03 19:23:12",
    actiontime: "2017-10-03 19:23:12"
  }
];



class Userrole extends React.Component {
  constructor(){
    super()
    this.state = {
      arr:[]
    }
  }
  render() {
    return (
      <div className="wy_container">
      <div className="wy_usertitlebox">
        <span className="wy_usertitle">用户角色</span>
        <button className="wy_adduser" onClick={this.adduser}>添加角色</button>
      </div>
        <section className="syh-classInfo">
          <Table
            pagination={{ pageSize: 5 }}
            columns={columns}
            dataSource={this.state.arr.length?this.state.arr:data}
          />
        </section>
      </div>
    );
  }
  adduser=()=>{
    this.props.history.push('/exam/add')
  }
  componentDidMount(){
    var arr = [];
    var that = this

    http.get('/user/user',{}).then(res=>{
      console.log(res)
      res.data.length>0?res.data.map((item,index) =>{
        arr.push({
          key:index,
          username:item.user_name,
          remark:item.identity_text,
          createtime:'2019-3-4',
          actiontime:'2019-3-4'
        })
      }):console.log(1)
      that.setState({arr})
    }).catch((err)=>{
      console.log(err)
    })
    
  }
}
export default connect((state)=>{
  return state
},(dispatch)=>{
  return {update(){
    dispatch({
      type:'demo/update'
    }) 
  }}
})(Userrole);
