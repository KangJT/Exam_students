import React from "react";
import "./style.css";
import {
  Menu,
  Icon,
  message,
  Table,
  Divider,
  Select,
  Progress
} from "antd";
import http from "../../http";

const columns = [
  {
    dataIndex: "textname",
    key: "textname",
    render: textname => (
      <span>
        {textname.map(tag => {
          return <p key={tag}>{tag}</p>;
        })}
      </span>
    )
  },
  {
    dataIndex: "emaxclass",
    key: "emaxclass",
    render: emaxclass => (
      <span>
        {emaxclass.map(tag => {
          return <p key={tag}>{tag}</p>;
        })}
      </span>
    )
  },
  {
    dataIndex: "createuser",
    key: "createuser",
    render: createuser => (
      <span>
        {createuser.map(tag => {
          return <p key={tag}>{tag}</p>;
        })}
      </span>
    )
  },
  {
    key: "address",
    dataIndex: "address",
    render: address => (
      <span>
        {address.map(tag => {
          return <p key={tag}>{tag}</p>;
        })}
      </span>
    )
  },
  {
    key: "line",
    dataIndex: "line",
    render: line => (
      <div style={{ width: "170px" }}>
        {line.map((item, index) => {
          return <Progress percent={item} key={index} />;
        })}
      </div>
    )
  },
  {
    key: "action",
    dataIndex: "idenx",
    render: idenx => (
      <span>
        <a href={"/#/exam/exampaper?"+idenx} >详情</a>
        <Divider type="vertical" />
        <a href="/" >更多</a>
      </span>
    )
  }
];

const data = [
  {
    key: "1",
    emaxclass: ["考试班级", "1608A/1608B"],
    name: "John Brown",
    textname: ["模块一开发 周考1", "考试时间120分钟 共50道题"],
    address: ["开始时间", "2019-3-14"],
    line: [30],
    tags: ["nice", "developer"],
    createuser: ["创建人", "刘宇"]
  },
  {
    key: "2",
    name: "Jim Green",
    emaxclass: ["考试班级", "1608A/1608B"],
    age: 42,
    address: ["开始时间", "2019-3-14"],
    textname: ["模块一开发 周考1", "考试时间120分钟 共50道题"],

    line: [50],
    tags: ["loser"],
    createuser: ["创建人", "刘宇"]
  },
  {
    key: "3",
    name: "Joe Black",
    emaxclass: ["考试班级", "1608A/1608B"],
    textname: ["模块一开发 周考1", "考试时间120分钟 共50道题"],
    age: 32,
    address: ["开始时间", "2019-3-14"],
    line: [50],
    tags: ["cool", "teacher"],
    createuser: ["创建人", "刘宇"]
  }
];

const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

class Examination extends React.Component {
  constructor() {
    super();
    this.state = {
      menu: "",
      menu1: "",
      menu2: "",
      list:[]
    };
  }
  componentWillMount(){
    http.get('/exam/exam').then(res=>{
      console.log(res)
    })
  }
  render() {
    return (
      <div className="wy_exambox">
        <div className="wy_usertitlebox">
          <span className="wy_examtitleboxes">考试管理</span>
        </div>
        <div className="wy_choose">
          <div>
            <span>类型：</span>
            <Select
              defaultValue={
                this.state.menu ? this.state.menu[0].exam_name : "周考一"
              }
              style={{ width: 120 }}
              onChange={handleChange}
            >
              {this.state.menu ? (
                this.state.menu.map(item => {
                  return (
                    <Option value={item.exam_id} key={item.exam_id}>
                      {item.exam_name}
                    </Option>
                  );
                })
              ) : (
                <Option value="none">未知网络</Option>
              )}
            </Select>
          </div>
          <div>
            <span>课程：</span>
            <Select
              defaultValue={
                this.state.menu2 ? this.state.menu2[0].subject_text : "javascript上"
              }
              style={{ width: 120 }}
              onChange={this.handleChange}
            >
              {this.state.menu2 ? (
                this.state.menu2.map(item => {
                  return (
                    <Option value={item.subject_id} key={item.subject_id}>
                      {item.subject_text}
                    </Option>
                  );
                })
              ) : (
                <Option value="none">未知网络</Option>
              )}
            </Select>
          </div>
          <div>
            <span>班级：</span>
            <Select
              defaultValue={
                this.state.menu1 ? this.state.menu1[0].grade_name : "1608A"
              }
              style={{ width: 120 }}
              onChange={handleChange}
            >
              {this.state.menu1 ? (
                this.state.menu1.map(item => {
                  return (
                    <Option value={item.grade_id} key={item.grade_id}>
                      {item.grade_name}
                    </Option>
                  );
                })
              ) : (
                <Option value="none">未知网络</Option>
              )}
            </Select>
          </div>
        </div>
        <div className="wy_examtable">
          <Table columns={columns} dataSource={this.state.list} />
        </div>
      </div>
    );
  }
  handleChange=(e)=>{
    let that = this;
    http.get("/exam/exam", {subject_id:e}).then(res => {
      var lists = []
      res.exam.map((item,index)=>{
        
        lists.push({
          key: index,
          name: item.user_id,
          emaxclass: ["考试班级", "1608A/1608B"],
          textname: [item.title, "考试时间120分钟 共50道题"],
          age: 32,
          address: ["开始时间", new Date(item.start_time*1).toLocaleDateString()],
          line: [item.number*10],
          tags: ["cool", "teacher"],
          createuser: ["创建人", "刘宇"],
          idenx:item.exam_exam_id
        })
      })
      that.setState({list:lists})
      console.log(lists)
    }).catch((err)=>{
      console.log(err)
    });
  }
  componentDidMount() {
    var that = this
    http.get("/exam/examType").then(res => {
      console.log(res);
      this.setState({ menu: res.data });
    }).catch((err)=>{
      console.log(err)
    });
    http.get("/exam/subject", {}).then(res => {
      console.log(res);
      this.setState({ menu2: res.data });
    }).catch((err)=>{
      console.log(err)
    });
    http.get("/manger/grade", {}).then(res => {
      console.log(res);
      this.setState({ menu1: res.data });
    }).catch((err)=>{
      console.log(err)
    });
    http.get("/exam/exam", {}).then(res => {
      var lists = []
      res.exam.map((item,index)=>{
        
        lists.push({
          key: index,
          name: item.user_id,
          emaxclass: ["考试班级", "1608A/1608B"],
          textname: [item.title, "考试时间120分钟 共50道题"],
          age: 32,
          address: ["开始时间", new Date(item.start_time*1).toLocaleDateString()],
          line: [item.number*10],
          tags: ["cool", "teacher"],
          createuser: ["创建人", "刘宇"],
          idenx:item.exam_exam_id
        })
      })
      that.setState({list:lists})
      console.log(lists)
    }).catch((err)=>{
      console.log(err)
    });
  }
}

export default Examination;
