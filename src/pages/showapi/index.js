import React from 'react'
import http from '../../http'
import { Table } from 'antd';
const columns = [{
    title: '权限名称',
    dataIndex: 'api_authority_text',
    key: 'api_authority_text',
  },{
    title: '请求接口',
    dataIndex: 'api_authority_url',
    key: 'api_authority_url',
  },{
    title: '请求方式',
    dataIndex: 'api_authority_method',
    key: 'api_authority_method',
  }
    ];
  
  const data = [{
    key: '1',
    api_authority_text: 'John Brown',
    api_authority_url: 32,
    api_authority_method: 'New York No. 1 Lake Park'
  }];
  
class Showapi extends React.Component{
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
    http.get('/user/identity_api_authority_relation',{}).then((res)=>{
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

export default Showapi