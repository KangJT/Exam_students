import React from 'react'
import { Table, Select } from 'antd'
import './index.css'
import 'antd/dist/antd.css'
import http from '@/http'
const Option = Select.Option
class Paging extends React.Component {
    constructor() {
        super()
        this.state = {
            tableColumnx: [],
            data: [
                {
                    "key": '1',
                    "name": "1608A",
                    "host": "曲丽丽",
                    "pro": "以完成",
                    "not": "重新阅卷",
                    "date": "20183.21",
                    "oto": "900%"
                },
                {
                    "key": '2',
                    "name": "1608B",
                    "host": "张三 ",
                    "pro": "未完成",
                    "not": "重新阅卷",
                    "date": "20183.21",
                    "oto": "6.0%"
                },
                {
                    "key": '3',
                    "name": "1609A",
                    "host": "李四",
                    "pro": "未完成",
                    "not": "重新阅卷",
                    "date": "20183.21",
                    "oto": "80%"
                },
                {
                    "key": '4',
                    "name": "1609b",
                    "host": "王五",
                    "pro": "以完成",
                    "not": "重新阅卷",
                    "date": "20183.21",
                    "oto": "70%"
                },
                {
                    "key": '5',
                    "name": "1610A",
                    "host": "小李",
                    "pro": "未完成",
                    "not": "重新阅卷",
                    "date": "20183.21",
                    "oto": "60%"
                },
                {
                    "key": '6',
                    "name": "1610b",
                    "host": "小王",
                    "pro": "以完成",
                    "not": "重新阅卷",
                    "date": "20183.21",
                    "oto": "45%"
                },
                {
                    "key": '7',
                    "name": "1611A",
                    "host": "校长",
                    "pro": "未完成",
                    "not": "重新阅卷",
                    "date": "20183.21",
                    "oto": "20%"
                },
                {
                    "key": '8',
                    "name": "1611B",
                    "host": "小屏",
                    "pro": "以完成",
                    "not": "重新阅卷",
                    "date": "20183.21",
                    "oto": "50%"
                },
                {
                    "key": '9',
                    "name": "1611B",
                    "host": "小屏",
                    "pro": "以完成",
                    "not": "重新阅卷",
                    "date": "20183.21",
                    "oto": "50%"
                },
                {
                    "key": '10',
                    "name": "1611B",
                    "host": "小屏",
                    "pro": "以完成",
                    "not": "重新阅卷",
                    "date": "20183.21",
                    "oto": "50%"
                },
                {
                    "key": '11',
                    "name": "1611B",
                    "host": "小屏",
                    "pro": "以完成",
                    "not": "重新阅卷",
                    "date": "20183.21",
                    "oto": "50%"
                },
                {
                    "key": '12',
                    "name": "1611B",
                    "host": "小屏",
                    "pro": "以完成",
                    "not": "重新阅卷",
                    "date": "20183.21",
                    "oto": "50%"
                },
                {
                    "key": '13',
                    "name": "1611B",
                    "host": "小屏",
                    "pro": "以完成",
                    "not": "重新阅卷",
                    "date": "20183.21",
                    "oto": "50%"
                },
                {
                    "key": '14',
                    "name": "1611B",
                    "host": "小屏",
                    "pro": "以完成",
                    "not": "重新阅卷",
                    "date": "20183.21",
                    "oto": "50%"
                }
            ],
            count: 8,
            tableColumns: [
                {
                    title: "班级名称",
                    "dataIndex": "name",
                    "key": "name"
                },
                {
                    title: "出题人",
                    "dataIndex": "host",
                    "key": "host"
                },
                {
                    title: "阅卷状态",
                    "dataIndex": "pro",
                    "key": "pro"
                },
                {
                    title: "操作时间",
                    "dataIndex": "date",
                    "key": "date"
                },
                {
                    title: "成材率",
                    "dataIndex": "oto",
                    "key": "oto"
                },
                {
                    title: "操作",
                    "dataIndex": "not",
                    "key": "not"
                }
            ]
        }
    }
    componentDidMount() {
        http.get('/exam/exam',{}).then((res => {
            console.log(res)
        })).catch((res)=>{
            console.log(res)
        })
    }
    render() {
        return <div className="wrap">
            <div className="title">
                <div className="not">
                    <span>状态：</span>
                    <Select defaultValue="不限" style={{ width: 150 }}>
                        <Option value="jack">jack</Option>
                        <Option value="lucy">lucy</Option>
                        <Option value="disabled">disabled</Option>
                    </Select>
                </div>
                <div className="not">
                    <span>班级：</span>
                    <Select defaultValue="不限" style={{ width: 150 }}>
                        <Option value="jack">jack</Option>
                        <Option value="lucy">lucy</Option>
                        <Option value="disabled">disabled</Option>
                    </Select>
                </div>
            </div>
            <h3>试卷列表</h3>
            <div className="cont">
                <Table columns={this.state.tableColumns}
                    dataSource={this.state.data}
                    pagination={{
                        total: this.state.count,
                        pageSize: 4,
                        defaultPageSize: 4,
                        showQuickJumper: true
                    }}
                />
            </div>
        </div>
    }
}

export default Paging;
