import React, { Component } from "react";
import "./index.css";
import { Select, Button, Table } from "antd";
import http from "../../utils/fetch";
const { Column } = Table;
const Option = Select.Option;
class Readtest extends Component {
  state = {
    list: []
  };
  render() {
    return (
      <div className="z_readtest">
        <h2>考试管理</h2>
        <div className="sel">
          <span>状态:</span>
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
            <Option value="jack">完成</Option>
            <Option value="lucy">未开始</Option>
            <Option value="tom">进行中</Option>
          </Select>
          <span>班级:</span>
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.handleChange}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.state.list.map(item => (
              <Option value={item.grade_name} key={item.grade_id}>
                {item.grade_name}
              </Option>
            ))}
          </Select>
          <Button type="primary" icon="search" style={{ float: "right" }}>
            查询
          </Button>
        </div>
        <div className="list-test">
          <h3>试卷列表</h3>
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
            <Column title="班级名称" dataIndex="grade_name" key="grade_name" />
            <Column title="出题人" dataIndex="user_name" key="user_name" />
            <Column title="阅卷状态" dataIndex="state" key="state" />
            <Column title="操作时间" dataIndex="time" key="time" />
            <Column title="成材率" dataIndex="yield" key="yield" />
            <Column
              title="操作"
              key="action"
              render={(text, record, index) => {
                return (
                  <span>
                    <a
                      href="javascript:;"
                      onClick={() => this.getList(text.grade_id)}
                    >
                      开始阅卷
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
  handleChange = value => {
    console.log(`selected ${value}`);
  };
  componentDidMount() {
    let { list } = this.state;
    let that = this;
    http.get("/manger/grade").then(data => {
      //获取所有的班级
      data.data &&
        data.data.forEach((item, index) => {
          list.push({
            key: index,
            grade_name: item.grade_name,
            grade_id: item.grade_id
          });
        });
      that.setState({
        list: list
      });
    });
    http.get("/user/user").then(data => {
      let pro =
        data.data &&
        data.data.filter(item => {
          return item.identity_text === "出题者";
        });
      pro.map((item, index) => {
        list[index].user_name = item.user_name;
        list[index].user_id = item.user_id;
        list[index].user_pwd = item.user_pwd;
        list[index].state = "未开始";
        list[index].time =
          new Date().toLocaleDateString() + new Date().toLocaleTimeString();
        list[index].yield = 0 + "%";
      });
      that.setState({
        list: list
      });
    });

    // http.get("/exam/exam").then(data => {
    //   console.log(data);
    // });
  }
  getList = grade_id => {
    http.get("/exam/exam").then(data => {
      console.log(data);
    });
    http
      .get("/exam/student", {
        grade_id: grade_id,
        exam_exam_id: "",
        student_id: "",
        start_time: 2,
        end_time: 5,
        page: 1,
        pageSize: 10
      })
      .then(data => {
        console.log(data);
      });
  };
}
export default Readtest;

// <Column title="班级名称" dataIndex="grade_name1" key="grade_name1" />
// <Column title="出题人" dataIndex="room_text" key="room_text" />
// <Column title="阅卷状态" dataIndex="grade_name" key="grade_name" />
// <Column title="操作时间" dataIndex="room_text" key="room_text" />
// <Column title="成材率" dataIndex="grade_name" key="grade_name" />
// <Column title="操作" dataIndex="room_text" key="room_text" />
