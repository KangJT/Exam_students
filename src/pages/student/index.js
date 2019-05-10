import React from 'react'
import http from "@/http"
import './index.css'
import Cookie from '../../http/utils'
import { Input, Select, Button ,Table} from 'antd'
import axios from 'axios';
let token = Cookie.get('userid');
const Option = Select.Option;
class Chuti extends React.Component {
    state = {
        date: [],
        str: [],
        list:[],
        num:"",
        tableCliumn: [
            {
                title: "姓名",
                dataIndex: "student_name",
                key: "student_name"
            },
            {
                title: "学号",
                dataIndex: "student_id",
                key: "student_id"
            },
            {
                title: "班级",
                key:"oop"
            },
            {
                title: "教室",
                key:"llp"
            },
            {
                title: "密码",
                dataIndex: "student_pwd",
                key: "student_pwd"
            },
            {
                title: "操作",
                key: "operation",
                render: (text,record) => (
                    <a onClick={()=>{this.deletSource(text)}}>删除</a>
                )
            }
        ]
    }
    render() {
        return (
            <div className="wrap">
                <h3 className="lbw-title">学生管理</h3>
                <div className="totle">
                    <Input placeholder="输入学生姓名" style={{ width: 120 }} onChange={(e)=>{this.change(e)}} value={this.state.num}/>
                    <Select defaultValue="请输入教室号" style={{ width: 150, marginLeft: 50 }}>
                        {
                            this.state.date.map((item, index) => (
                                <Option value={item.room_text} key={index}>{item.room_text}</Option>
                            ))
                        }
                    </Select>
                    <Button type="primary" style={{ width: 100, marginLeft: 30 }} onClick={()=>{this.ment()}}>搜索</Button>
                    <Button type="primary" style={{ width: 100, marginLeft: 30 }} onClick={()=>{this.list()}}>重置</Button>
                </div>
                <Table columns={this.state.tableCliumn}
                    dataSource={this.state.str}
                    pagination={{
                        total: this.state.str.length,
                        pageSize: 10,
                        showSizeChanger:true,
                        showQuickJumper:true
                    }}
                >
                </Table>
            </div>
        )
    }
    componentDidMount() {
        http.get('/manger/room', {}).then((res) => {
            this.setState({
                date: res.data
            })
        })
        http.get('/manger/student/new', {}).then((res) => {
            res.data.map((item,index)=>{
                item.key=item.student_id
            })
            this.setState({
                str: res.data
            })
        }).catch((res)=>{
            alert("错误")
        })
    }
    change=(e)=>{
        this.setState({
            num:e.target.value
        })
    }
    ment=()=>{
        let arr=[];
        http.get('/manger/student/new', {}).then((res) => {
            res.data.map((item,index)=>{
                item.key=item.student_id
                if(item.student_name.indexOf(this.state.num)>-1){
                        arr.push(item)
                }
            })
            this.setState({
                str: arr
            })
        }).catch((res)=>{
            alert("错误")
        })
    }
    list=()=>{
        this.setState({
            num:""
        })
    }
    deletSource=(text)=>{
           let userid=text.student_id;
           fetch('/manger/student/:id=>'+userid,{
               method:'DELETE',
               headers: {
                "content-Type": "application/json",
                "authorization":token
              }
           }).then((res)=>{
               return res.json()
           }).then((data)=>{
               console.log(data)
           }).catch((res)=>{
            alert("错误")
        })
    }
}
export default Chuti