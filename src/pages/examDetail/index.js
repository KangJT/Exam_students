import React from 'react';
import './index.css'
import http from '@/http'
import { Tag } from 'antd';
class ExamDetail extends React.Component {
    constructor(){
        super()
        this.state = {
            item:{}
        }
    }
    componentDidMount(){
        let id =this.props.location.search.split('=')[1];
        
        this.fetchData(id)
    }
    fetchData=(id)=>{
        http.get('/exam/questions/condition').then(res=>{
           let item = res.data.filter(item=>{
                return item.questions_id===id
            });
            this.setState({item:item[0]})
        })
    }
    toDom(){
        console.log(document)
        return '<p>ss</p>'
    }
    render(){
        const { item } = this.state;
        console.log(item)
        return <div className="syh-container">
            <h2>试卷详情</h2>
            <div className="syh-detail">
                <div className=" syh-eachItem syh-detailFlexLeft">
                    <p>出题人:<span style={{padding:'0 10px'}}>{item.user_name}</span></p>
                    <p style={{fontSize:'16px',fontWeight:'bold'}}>题目信息</p>
                    <div style={{marginBottom:'20px'}}>
                        <Tag color="blue" >{item.questions_type_text}</Tag>
                        <Tag color="geekblue" >{item.subject_text}</Tag>
                        <Tag color="orange" >{item.exam_name}</Tag>
                    </div>
                    <div>
                        <p style={{fontSize:'16px',fontWeight:'bold'}}>{item.questions_stem}</p>
                        <section className="syh-examDetailTitle">
                            {item.title}
                        </section>
                    </div>
                </div>
                <div className=" syh-eachItem syh-detailFlexRight">
                    <p style={{fontSize:'16px',fontWeight:'bold'}}>题目信息</p>
                    <section>
                        {item.questions_answer}
                    </section>
                </div>
            </div>
        </div>
    }
}

export default ExamDetail