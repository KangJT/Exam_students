import React from 'react'
import './index.css'
import http from '@/http'
class Ment extends React.Component {
    state = {
        val: "",
        date: "",
        select: "",
        leixi: ""
    }
    render() {
        return (
            <div className="wrap">
                <h3 className="title">创建考试</h3>
                <div className="cont">
                    <form>
                        <span>试卷名称:</span><input placeholder="请输入试卷名称" onChange={this.mount} />
                    </form>
                    <form>
                        <span>考试时间:</span><input placeholder="请输入试卷名称" onChange={this.moop} />
                    </form>
                    <div className="set">
                        <span>选择课程:</span>
                        <select onChange={this.leixi}>
                            <option value="1">指导考试</option>
                            <option>指导考试班</option>
                            <option>指导考试班级</option>
                            <option>指导考试班级1</option>
                        </select>
                    </div>
                    <div className="set">
                        <span>考试类型</span>
                        <select onChange={this.select}>
                            <option>选择监考老师</option>
                            <option>选择监考老师</option>
                            <option>选择监考老师</option>
                            <option>选择监考老师</option>
                        </select>
                    </div>
                    <div className="fot">
                        <button>重置</button>
                        <button onClick={() => { this.change() }}>生成</button>
                    </div>
                </div>
            </div>
        )
    }
    change = () => {
        let num=new Date().getHours();
        let nul=new Date().getMinutes();
        let pol=num+":"+nul;
        let that=this;
        http.post('/exam/exam', {
            "subject_id":that.state.val,
            "exam_id":that.state.leixi,
            "title":that.state.date,
            "start_time":1,
            "end_time":1
        }).then((res) => {
            console.log(res)
        }).catch((res)=>{
            console.log(res)
        })
    }
    mount = (e) => {
        this.setState({
            val: e.target.value
        })
    }
    moop = (e) => {
        this.setState({
            date: e.target.value
        })

    }
    select = (e) => {
        this.setState({
            select: e.target.value
        })
        console.log(e.target.value)
    }
    leixi = (e) => {
        this.setState({
            leixit: e.target.value
        })
        console.log(e.target.value)
    }

}
export default Ment