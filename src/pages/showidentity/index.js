import React from 'react'
import http from '../../http'
import { Table, Divider, Tag } from 'antd';
const columns = [{
    title: '角色类型',
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
  
class Showidentity extends React.Component{
    constructor(){
        super()
        this.state={
            arrlist:[]
        }
    }
  render(){
      return (
          <div className="wy_showuser">
              <Table columns={columns} dataSource={this.state.arrlist?this.state.arrlist:data} pagination={{pageSize:4}}/>
          </div>
      )
  }
  componentDidMount(){
    http.get('/user/identity',{}).then((res)=>{
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

export default Showidentity