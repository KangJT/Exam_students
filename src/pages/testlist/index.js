import React, { Component } from "react";
import "./index.css";
import { Table, Select, Button } from "antd";
import http from "../../utils/fetch";
const { Column } = Table;
const Option = Select.Option;
class Testlist extends Component {
  state = {
    list: [],
    testtype: [],
    sub: []
  };
  render() {
    return (
      <div className="z_testlist">
        <div className="sel">
          <span style={{ marginRight: "5px" }}>考试类型:</span>
          <Select
            showSearch
            style={{ width: 200, marginRight: 50 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.handleChange1}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.state.testtype.map(item => (
              <Option value={item.exam_name} key={item.exam_id}>
                {item.exam_name}
              </Option>
            ))}
          </Select>
          <span style={{ marginRight: "5px" }}>课程:</span>
          <Select
            showSearch
            style={{ width: 200, marginRight: 50 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.handleChange}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.state.sub.map(item => (
              <Option value={item.subject_id} key={item.subject_id}>
                {item.subject_text}
              </Option>
            ))}
          </Select>

          <Button type="primary" icon="search" style={{ float: "right" }}>
            查询
          </Button>
        </div>
        <div className="list">
          <h2>试卷列表</h2>
          <Table
            dataSource={this.state.list}
            size="middle"
            pagination={{
              total: this.state.list.length,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSize: 4
            }}
          >
            <Column title="试卷信息" dataIndex="title" key="title" />
            <Column
              title="班级"
              key="cls"
              render={(text, record, index) => {
                return <span>1608A</span>;
              }}
            />
            <Column
              title="创建人"
              key="peo"
              render={(text, record, index) => {
                return <span>zhangwenxiu</span>;
              }}
            />
            <Column title="开始时间" key="start_time" dataIndex="start_time" />
            <Column title="结束时间" key="end_time" dataIndex="end_time" />
            <Column
              title="操作"
              key="action"
              render={(text, record, index) => {
                return (
                  <span>
                    <a
                      href="javascript:;"
                      onClick={() => this.getdetail(text.exam_exam_id)}
                    >
                      详情
                    </a>
                  </span>
                );
              }}
            />
          </Table>
        </div>
      </div>
    );
  }
  componentDidMount() {
    let that = this;
    let { list, testtype, sub } = this.state;
    http.get("/exam/exam").then(data => {
      //获取试卷列表
      if (data.code === 1) {
        list = [...data.exam];
        list.map((item, index) => {
          item.key = index;
        });
        that.setState({
          list
        });
      }
    });
    http.get("/exam/examType").then(data => {
      //获取所有的考试类型
      if (data.code === 1) {
        testtype = [...data.data];
      }
      that.setState({
        testtype
      });
    });
    http.get("/exam/subject").then(data => {
      //获取所有的班级
      if (data.code === 1) {
        sub = [...data.data];
      }

      that.setState({
        sub
      });
    });
  }
  handleChange = id => {
    let that = this;
    let { list } = this.state;
    http
      .get("/exam/exam", {
        subject_id: id
      })
      .then(data => {
        //获取试卷列表
        list = [...data.exam];
        list.map((item, index) => {
          item.key = index;
        });
        that.setState({
          list
        });
      });
  };
  getdetail = id => {
    let that = this;
    http.get("/exam/exam/" + id).then(data => {
      console.log(data);
      if (data.code === 1) {
        this.props.history.push({
          pathname: "/exam/testdetail",
          state: data.data
        });
      }
    });
  };
}

export default Testlist;
