import React from 'react';
import http from '@/http'
import { Table, Button, message, Input  } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'room_text',
  key: 'name',
  render: text => <span>{text}</span>,
},{
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <Button onClick={()=>{
          record.ck(record)
      }}>删除</Button>
    </span>
  ),
}];

class AddClass extends React.Component {
    constructor(){
        super()
        this.state ={
            list:[],
            timer:null,
            value:''
        }
    }
    componentDidMount(){
        this.getData()
    }
    ck=(i)=>{
        http.delete('/manger/room/delete',{
            ...i
        }).then(res=>{
            if(res.code===1){
                message.success(res.msg);
                this.getData()
            }
        })
    }
    getData=()=>{
        http.get('/manger/room').then(res=>{
            let { data } =res;
            if(res.code===1){
                data = data.map((item,i)=>{
                    item.ck = this.ck;
                    item.key = i;
                    return item;
                })
                this.setState({
                    list:data
                })
            }
        })
    }
    addClass = ()=>{
        if(!this.state.value) return;
        http.post('/manger/room',{
            room_text:this.state.value
        }).then(res=>{
           if(res.code===1){
               message.success(res.msg)
               this.getData();
           }else{
               message.error(res.msg)
           }
        })
    }
    getText=(e)=>{
        let { timer } = this.state;
        let value = e.target.value;
        clearTimeout(timer);
        timer=setTimeout(()=>{
          this.setState({
            value
          })
        },500)
    
        this.setState({
          timer
        })
        
      }
    render(){
        return <div className="syh-container">
            <div className="syh-classInfo">
               <div style={{margin:'20px 0',display:'flex'}}>
                <Button type="primary" onClick={this.addClass}>添加教室</Button>
                <Input style={{width:200,marginLeft:20}} onChange={this.getText} ></Input>
               </div>
                <Table columns={columns}  dataSource={this.state.list} />
            </div>
        </div>
    }
}

export default AddClass