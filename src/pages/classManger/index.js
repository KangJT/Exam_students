import React from "react";
import "./index.css";
import { Table, Button, Input, message } from "antd";
import { connect } from 'dva';
import http from '@/http'

const columns = [
  {
    title: "类型ID",
    dataIndex: "questions_type_id",
    key: "name",
    render: text => <span>{text}</span>
  },
  {
    title: "类型名称",
    dataIndex: "questions_type_text",
    key: "nums"
  },
  {
    title: "操作",
    key: "action",
    dataIndex:'questions_type_id',
    render: (text, record) => (
      <span>
        <Button  onClick={(e)=>{
          http.post('/exam/delQuestionsType',{
            id:text
          }).then(res=>{
            record.ck()
          })
        }}>删除</Button>
      </span>
    )
  }
];


class ClassManger extends React.Component {
  constructor(){
    super();
    this.state =  {
      data:[],
      value:'',
      timer:null
    }
  }
  ck=()=>{
    this.getData()
  }
  getData=()=>{
    http.get('/exam/getQuestionsType').then(res=>{
      let { data } = res;
      
      data = data.map((item,i)=>{
        return {...item,key:i,ck:this.ck}
      })
      this.setState({
        data
      })
    })
  }
  componentDidMount(){
    this.getData()
  }
  addType=()=>{
    let { value } = this.state;
    if(!value){
      message.error('请输入类型内容');
      return;
    }
    http.get('/exam/insertQuestionsType',{
      text: value,
      sort:new Date()*1
    }).then(res=>{
      if(res.code===1){
        this.getData();
        message.success(res.msg)
      }else{
        message.error(res.msg);
      }
    });
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
  render() {
    return (
      <div className="syh-container">
        
        <div className="syh-classInfo">
         <div className="syh-classInfoContent">
            <div style={{margin:'20px 0',display:'flex'}}>
                <Button onClick={this.addType} icon="plus" type="primary" >添加试题</Button>
                <Input style={{width:200,marginLeft:20}} onChange={this.getText} ></Input>
              </div>
              <Table
                pagination={{ pageSize: 6 }}
                columns={columns}
                dataSource={this.state.data}
              />
         </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state)=>{
  console.log(state)
  return state
}
const mapDispatchToProps = (dispatch) =>{
    return {
      update(){
        return dispatch({
          type:'products/borderland',
          payload:'sss'
        })
      }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ClassManger);
