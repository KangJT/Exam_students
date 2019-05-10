import React, { Component } from "react";
import "./index.css";
import { Input, Button, Select,message } from "antd";
import http from "../../utils/fetch";
const Option = Select.Option;
class CreatTest extends Component {
  state = {
    testtype: [],
    testsub: [],
    sub: "",
    exam: "",
    title: "",
    num: "",
    start: "",
    end: "",
    val1: "",
    val2: "",
    val3: ""
  };
  render() {
    return (
      <div className="z_wrap">
        <h2>创建考试</h2>
        <div className="con">
          <div style={{ marginTop: 20 }}>
            <b>试卷名称:</b>
            <Input
              value={this.state.title}
              placeholder="请输入试卷名称"
              onChange={e => this.handleChange(e, 1)}
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <b>考试时间:</b>
            <Select
              value={this.state.val1}
              showSearch
              style={{ width: 200 }}
              placeholder="Select"
              optionFilterProp="children"
              onChange={e => this.handleChange(e, 2)}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="8:00-9:00">8:00-9:00</Option>
              <Option value="2:00-6:00">2:00-6:00</Option>
              <Option value="8.30-12.30">8.30-12.30</Option>
              <Option value="1.30-5.30">1.30-5.30</Option>
            </Select>
          </div>
          <div style={{ marginTop: 20 }}>
            <b>考试类型:</b>
            <Select
              value={this.state.val2}
              allowClear
              showSearch
              style={{ width: 200 }}
              placeholder="Select"
              optionFilterProp="children"
              onChange={e => this.handleChange(e, 3)}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.testtype.map(item => (
                <Option value={item.exam_id} key={item.exam_id}>
                  {item.exam_name}
                </Option>
              ))}
            </Select>
          </div>
          <div style={{ marginTop: 20 }}>
            <b>选择课程:</b>
            <Select
              value={this.state.val3}
              allowClear
              showSearch
              style={{ width: 200 }}
              placeholder="Select"
              optionFilterProp="children"
              onChange={e => this.handleChange(e, 4)}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.testsub.map(item => (
                <Option value={item.subject_id} key={item.subject_id}>
                  {item.subject_text}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="btn">
          <Button onClick={this.reset}>重置</Button>
          <Button type="primary" onClick={this.save}>
            生成
          </Button>
        </div>
      </div>
    );
  }
  componentDidMount() {
    let that = this;
    http.get("/exam/examType").then(data => {
      //获取考试类型
      that.setState({
        testtype: data.data
      });
    });

    http.get("/exam/subject").then(data => {
      //获取考试类型
      that.setState({
        testsub: data.data
      });
    });
  }
  reset = () => {
    this.setState({
      title: "",
      val1: "",
      val2: "",
      val3: ""
    });
  };
  save = () => {
    //提交
    // console.log(this.state.sub);
    // console.log(this.state.exam);
    // console.log(this.state.start);
    // console.log(this.state.end);
    if (
      this.state.sub &&
      this.state.exam &&
      this.state.start &&
      this.state.start
    ) {
      http
        .post("/exam/exam", {
          subject_id: this.state.sub, //学科id
          exam_id: this.state.exam, //试卷类型id
          title: this.state.title, //试卷标题
          number: 20, //试卷题量
          start_time: this.state.start, //开始时间
          end_time: this.state.end //结束时间
        })
        .then(data => {
          console.log(data);
          message.success(data.msg)
        })
        .catch(err => {
          console.log(err);
        });
    }else{
      message.info('参数不完整');
    }
  };
  handleChange = (e, idx) => {
    if (idx === 1) {
      this.setState({
        title: e.target.value
      });
    } else if (idx === 2) {
      this.setState({
        start: parseFloat(e.split("-")[0]),
        end: parseFloat(e.split("-")[1]),
        val1: e
      });
    } else if (idx === 3) {
      this.setState({
        exam: e,
        val2: e
      });
    } else if (idx === 4) {
      this.setState({
        sub: e,
        val3: e
      });
    }
  };
}
export default CreatTest;
