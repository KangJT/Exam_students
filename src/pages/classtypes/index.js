import React, { Component } from "react";
import "./index.css";
import { Table } from "antd";
const columns = [
  {
    title: "班级名称",
    dataIndex: "name"
  },
  {
    title: "学习课程",
    dataIndex: "age"
  },
  {
    title: "阶级",
    dataIndex: "address"
  },
  {
    title: "班级人数",
    dataIndex: "name1"
  },
  {
    title: "任课老师",
    dataIndex: "age1"
  },
  {
    title: "班主任老师",
    dataIndex: "address1"
  },
  {
    title: "教室号",
    dataIndex: "address2"
  }
];
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
console.log(Table);
class Classtypes extends Componnet {
  render() {
    return (
      <div class="z_classtypes">
        <h2>班级分类</h2>
        <Table
          columns={columns}
          dataSource={data}
          size="middle"
          pagination={{
            total: len,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSize: 4
          }}
        />
      </div>
    );
  }
}
export default Classtypes;
