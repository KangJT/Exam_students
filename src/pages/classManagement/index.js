import React, { Component } from "react";
import { Collapse, Select, Table } from "antd";

import "./index.css";
import http from "../../utils/fetch";
const { Column } = Table;
const Panel = Collapse.Panel;
const Option = Select.Option;
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park"
  },
  {
    key: "4",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    key: "5",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park"
  },
  {
    key: "6",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park"
  },
  {
    key: "7",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park"
  },
  {
    key: "8",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park"
  },
  {
    key: "9",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park"
  }
];
let len = data.length;

class Classmanagement extends Component {
  state = {
    idx: 0,
    subject: [],
    grade: [],
    teacher: [],
    arr: [],
    exam: [],
    params: {
      questinos_id: "",
      questions_type_id: "",
      subject_id: "",
      exam_id: ""
    }
  };
  render() {
    return (
      <div className="z_classmenagement">
        <h2>课程管理</h2>
        <div className="classify">
          <Collapse accordion>
            <Panel header="学习课程" key="1">
              <p>
                {this.state.subject.map((item, index) => (
                  <span
                    className={this.state.idx === index ? "active" : ""}
                    onClick={() => this.handleClick(index, item.subject_id)}
                    key={item.subject_id}
                  >
                    {item.subject_text}
                  </span>
                ))}
              </p>
            </Panel>
          </Collapse>
          <div className="ipt">
            <span>出题人:</span>
            <Select
              defaultValue="不限"
              style={{ width: 190 }}
              onChange={e => this.handleChange(e, 1)}
            >
              {this.state.teacher&&this.state.teacher.map(item => (
                <Option value={item.user_name} key={item.user_id}>
                  {item.user_name}
                </Option>
              ))}
            </Select>

            <span style={{ marginLeft: 100 }}>考试类型:</span>
            <Select
              defaultValue="不限"
              style={{ width: 190 }}
              onChange={e => this.handleChange(e, 2)}
            >
              {this.state.exam.map((item, index) => (
                <Option value={item.exam_id} key={item.exam_id}>
                  {item.exam_name}
                </Option>
              ))}
            </Select>

            <span style={{ marginLeft: 100 }}>班级名称:</span>
            <Select
              defaultValue="不限"
              style={{ width: 190 }}
              onChange={e => this.handleChange(e, 3)}
            >
              {this.state.grade.map((item, index) => (
                <Option value={item.grade_name} key={item.grade_id}>
                  {item.grade_name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="tab">
          <Table
            dataSource={this.state.arr}
            size="middle"
            pagination={{
              total: len,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSize: 4
            }}
          >
            <Column
              title="学习科目"
              dataIndex="subject_text"
              key="subject_text"
            />
            <Column title="考试类型" dataIndex="exam_name" key="exam_name" />
            <Column
              title="试题类型"
              dataIndex="questions_type_text"
              key="questions_type_text"
            />
            <Column title="出题人" dataIndex="user_name" key="user_name" />
          </Table>
        </div>
      </div>
    );
  }
  handleClick = (idx, value) => {
    this.setState({
      idx: idx
    });
    let { params } = this.state;
    params.subject_id = value;
    this.setState({
      params: params
    });
    let that = this;
    http
      .get("/exam/questions/condition", {
        subject_id: value
      })
      .then(data => {
        that.setState({
          arr: data.data
        });
      });
  };
  componentDidMount() {
    let that = this;
    http.get("/exam/subject").then(data => {
      that.setState({
        subject: data.data
      });
    });
    http.get("/manger/grade").then(data => {
      that.setState({
        grade: data.data
      });
    });
    http.get("/user/user").then(data => {
      that.setState({
        teacher: data.data
      });
    });
    http.get("/exam/questions/new").then(data => {
      data.data&&data.data.forEach((item, index) => {
        item.key = index;
      });

      that.setState({
        arr: data.data
      });
    });
    http.get("/exam/examType").then(data => {
      that.setState({
        exam: data.data
      });
    });
  }
  handleChange = (value, idx) => {
    let that = this;
    if (idx === 1) {
    } else if (idx === 2) {
      let p = this.state.params;
      p.exam_id = value;
      this.setState({
        params: p
      });

      http
        .get("/exam/questions/condition", {
          exam_id: value
        })
        .then(data => {
          that.setState({
            arr: data.data
          });
        });
    } else if (idx === 3) {
      let p = this.state.params;
      p.subject_id = value;
      this.setState({
        params: p
      });
      http
        .get("/exam/questions/condition", {
          subject_id: value
        })
        .then(data => {
          this.setState({
            arr: data.data
          });
        });
    }
  };
}
export default Classmanagement;
