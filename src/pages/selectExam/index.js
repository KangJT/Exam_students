import React from 'react'
import SelectType from '@/components/select'
import http from '@/http';
import { Table, Tag, Button, message } from 'antd';
import './index.css'
const { CheckableTag } = Tag;
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render:( text, record )=>{
      return (
          <div>
              <div>
                  <div style={{fontWeight:'bold'}}>{record.questions_stem}</div>
              </div>
              <div className="syh-userContent">
                <Tag color="blue">{record.questions_type_text}</Tag>
                <Tag color="geekblue">{record.subject_text}</Tag>
                <Tag color="orange">{record.exam_name}</Tag>
              </div>
              <div>
                  <a href="/" className="syh-userName">{record.user_name} 发布</a>
              </div>
          </div>
      )
  },
}, {
  title: 'Action',
  render: (text, record) => {
      let id = record.questions_id;
      let url = '/#/exam/examDetail?id='+id
      return (
        <span>
          <a href={url}>详情</a>
        </span>
      )
  },
}];

class SelecetExam extends React.Component {
    constructor(){
        super();
        this.state={
            list:[],
            typeList:[],
            activeIndex:'',
            searchInfo:{},
            allchecked:false
        }
    }
    componentDidMount(){
      this.fetchData()
    }
    fetchData=()=>{
        http.get('/exam/questions/new').then(res=>{
            console.log(res)
            if(res.code!==1){
                message.error(res.msg||'相关文件丢失，请前端人员与后台沟通 ♂');
                return ;
            }else{
                message.success(res.msg);
            }
            let list = res.data.map((item,i)=>{
                return {
                    ...item,
                    key:i,
                }
            });
            this.setState({
                list
            });
        });
        http.get('/exam/getQuestionsType').then(res=>{
            if(res.code!==1){
                message.error(res.msg);
                return ;
            }
            let questionType = res.data.map(item=>{
                return {
                    value:item.questions_type_id,
                    content:item.questions_type_text,
                    sort:item.questions_type_sort
                };
            });
            this.setState({
                questionType
            })
        })
        http.get('/exam/subject').then(res=>{
            if(res.code!==1){
                message.error(res.msg);
                return ;
            }
           this.setState({
               typeList:res.data
           })
        })
        http.get('/exam/examType').then(res=>{
            if(res.code!==1){
                message.error(res.msg);
                return ;
            }
            let examType = res.data.map(item=>{
                return {
                    value:item.exam_id,
                    content:item.exam_name
                }
            });
            this.setState({
                examType
            });
        })
    }
    handleChange=(text,item,i)=>{  // 每一个成员的改变
        let { searchInfo, typeList } = this.state;
        typeList = typeList.map(item=>{
            item.checked = false;
            return item;
        })
        searchInfo.subject_id = item.subject_id;
        this.setState({
            activeIndex:i,
            searchInfo,
            typeList,
            allchecked: false
        })
    }
    selectAll=(ss)=>{  // 点击所有 选中所有
        let { typeList,searchInfo } = this.state;
        delete searchInfo.subject_id;

        typeList = typeList.map(item=>{
            item.checked = ss;
            return item;
        })
        this.setState({
            allchecked:ss,
            typeList:[...typeList],
            activeIndex:'',
            searchInfo
        })
    }
    changeExamType=(e,type)=>{
        let { searchInfo } = this.state;
        searchInfo[type]=e;
        this.setState({
            searchInfo
        });
        console.log(this.state.searchInfo)
    }
    startSelect=(e)=>{
        console.log(this.state.searchInfo)
        http.get('/exam/questions/condition',this.state.searchInfo).then(res=>{
            console.log(res)
            if(res.code===1){
                message.success('请求成功');
            }else{
                message.error(res.msg||'请检查网络是否连接')
            }
            this.setState({
                list: res.data
            })
         })
    }
    render(){
        const { questionType,typeList,examType } = this.state;
        let all = <CheckableTag checked={this.state.allchecked} key="9527" onChange={this.selectAll}>All</CheckableTag>
        return <div className="syh-container">
                <div className="syh-classInfo" style={{marginBottom:'20px'}} >
                    <div className="syh-flex">
                        <span>课程类型</span>
                        <div className="syh-selectContent">
                            {all}
                            {
                                typeList.map((item,i)=>{
                                    return <CheckableTag key={i} onChange={(ans)=>{
                                        this.handleChange(ans,item,i)
                                    }} checked={i===this.state.activeIndex?true:false||item.checked}>{item.subject_text}</CheckableTag>
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <div className="syh-flex" style={{margin:'30px 0'}}>
                            <div className="syh-likeTitle">考试类型</div>
                                <SelectType onChange={this.changeExamType} type="exam_id" selectData={examType} defaultValue="week1" /> 
                            <div style={{margin:'0 20px'}}>题目类型</div>
                                <SelectType  defaultValue="multipletest" onChange={this.changeExamType} type="questions_type_id" selectData={ questionType } />
                                <Button onClick={ this.startSelect } style={{margin:"0 20px"}} type="primary" icon="search">Search</Button>
                        </div>
                    </div>
                </div>
                <div className="syh-classInfo">
                     <Table  columns={columns} dataSource={this.state.list} />
                </div>
        </div>
    }
}
export default SelecetExam

