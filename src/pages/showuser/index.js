import React from 'react'
import './style.css'
import http from '../../http'
import { Table, Divider, Tag } from 'antd';
const columns = [{
    title: 'user_name',
    dataIndex: 'user_name',
    key: 'user_name',
  }, {
    title: 'user_pwd',
    dataIndex: 'user_pwd',
    key: 'user_pwd',
  }, {
    title: 'identity_text',
    dataIndex: 'identity_text',
    key: 'identity_text',
  }
    ];
  
  const data = [{
    key: '1',
    user_name: 'John Brown',
    user_pwd: 32,
    identity_text: 'New York No. 1 Lake Park'
  }];
  
class Showuser extends React.Component{
    constructor(){
        super()
        this.state={
            arrlist:[]
        }
    }
  render(){
      return (
          <div className="wy_showuser">
              <Table columns={columns} 
              dataSource={this.state.arrlist?this.state.arrlist:data} 
              pagination={{pageSize:4}}/>
          </div>
      )
  }
  componentDidMount(){
    http.get('/user/user',{}).then((res)=>{
      res.data.map((item,index)=>{
        item.key = index
    })
        this.setState({arrlist:res.data})
        console.log(res.data)
    }).catch((err)=>{
        console.log(err)
    })
  }
}

export default Showuser