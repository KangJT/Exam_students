import React from 'react' 
import './index.css'
import { Input,Button, message  } from 'antd'
import E from 'wangeditor';
import SelectType from '@/components/select'
import http from '@/http'
import { connect } from 'dva';
console.log(E);
class AddExam extends React.Component {
    constructor(){
        super()
        this.state ={
            examInfo:{},
            userInfo:{},
            examType:[
                {
                    value:'week1',
                    content:'周考1'
                },
                {
                    value:'week2',
                    content:'周考2'
                },
                {
                    value:'week3',
                    content:'周考3'
                },
                {
                    value:'yuekao',
                    content:'月考'
                },
            ],
            classType:[
                {
                    value:'javascript1',
                    content:'js上'
                },
                {
                    value:'javascript2',
                    content:'js下'
                },
            ],
            questionType:[
                {
                    value:'simpletest',
                    content:'单选题'
                },
                {
                    value:'multipletest',
                    content:'多选题'
                },
            ]

        }
    }
  
    render(){
        const { examType,classType,questionType } = this.state;
        return <div className="syh-container">
                <h2 className="syh-title">添加试题</h2>
                <div className="syh-classInfo">
                    <h1>题目信息</h1>
                    <h3 className="syh-examTitle">题干</h3>
                    <div className="syh-inputContent">
                        <Input onChange={(e)=>{this.keyinExamInfo(e,'questions_stem')}} placeholder='请输入题目标题，不超过20个字' />
                    </div>
                    <h3 className="syh-examTitle">题目主题</h3>
                    <div className="syh-inputContent">
                        <div id="div3" ref="editor"></div>
                    </div>
                    <h3 className="syh-examTitle">请选择考试类型</h3>
                        <SelectType onChange={this.changeExamType} type="exam_id" selectData={examType} defaultValue="week1" />
                    <h3 className="syh-examTitle">请选择课程类型</h3>
                        <SelectType onChange={this.changeExamType} type="subject_id" selectData={classType} defaultValue="javascript1" />        
                    <h3 className="syh-examTitle">请选择题目类型</h3>
                        <SelectType onChange={this.changeExamType} type="questions_type_id" selectData={questionType} defaultValue="multipletest" /> 
                    <h3 className="syh-examTitle">答案信息</h3>
                    <div className="syh-inputContent" style={{marginBottom:'20px'}}>
                        <div id="div4" ref="editor2"></div>
                    </div>
                    <div>
                        {/* {
                            this.props.products2.map(item=>{
                                return <div key={}>{item.exam_id}</div>
                            })
                        } */}
                    </div>
                    <Button  onClick={this.submitExamInfo} type="primary">提交</Button>
                </div>
        </div>
    }
    componentDidMount(){
        let { examInfo } = this.state;
        this.props.getExamType('/exam/examType');
        // setTimeout(()=>{
        //     console.log(this.props.products2)
        // },500)
        let editor2 = new E(this.refs.editor2)
        let editor = new E(this.refs.editor)   // 初始化 富文本的调用
        editor.customConfig.onchange =  (html)=>{
            examInfo.title=editor.txt.text();
            this.setState({examInfo})
        }
        editor2.customConfig.onchange =  (html)=>{
            examInfo.questions_answer=editor2.txt.text();
            this.setState({examInfo})
        }
        editor2.customConfig.zIndex = 1;
        editor.create()
        editor2.create()
        this.fetchData();  // 数据类型的获取
    }
    changeExamType=(e,type)=>{  // 传给SelectType组件的回调，根据type判断类型
        let { examInfo } = this.state;
        examInfo[type]=e;
        this.setState({
            examInfo
        });
    }
    keyinExamInfo(e,type){  // 输入框
        let { examInfo } = this.state;
        examInfo[type]=e.target.value;
        this.setState({
            examInfo
        });
    }
    submitExamInfo=(e)=>{
        http.post('/exam/questions',this.state.examInfo).then(res=>{
            console.log(res)
             if (res.code===1){
                message.success(res.msg);
            }else{
                message.error(res.msg);
            }
        })
    }
    fetchData(){
        http.get('/user/userInfo').then(res=>{
            if(res.code!==1){
                message.error(res.msg);
                return ;
            }else{
                message.success(res.msg);
            }
            let { examInfo } = this.state;
            
            examInfo.user_id = res.data.user_id&&res.data.user_id;
            this.setState({
                examInfo
            })
        });
        http.get('/exam/getQuestionsType').then(res=>{
            if(res.code!==1){
                message.error(res.msg);
                return ;
            }else{
                message.success(res.msg);
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
        });
        http.get('/exam/subject').then(res=>{
            if(res.code!==1){
                message.error(res.msg);
                return ;
            }else{
                message.success(res.msg);
            }
            let classType = res.data.map(item=>{
                return {
                    value:item.subject_id,
                    content:item.subject_text
                }
            })
            this.setState({
                classType
            })
        })
        http.get('/exam/examType').then(res=>{
            if(res.code!==1){
                message.error(res.msg);
                return ;
            }else{
                message.success(res.msg);
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
}
const mapStateToProps = (state)=>{
    return state
}
const mapDispatchToProps = (dispatch)=>{
    return {
        getExamType(payload){
           dispatch({
               type:'products2/addAfter1Second',
               payload
           })
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddExam)