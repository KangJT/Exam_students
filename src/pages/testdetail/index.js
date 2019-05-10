import React, { Component } from "react";
import "./index.css";
class Testdetail extends Component {
  state = {
    data: {}
  };
  render() {
    return (
      <div className="z_testdetail">
        <div style={{ padding: "10px" }}>
          <h2
            style={{
              textAlign: "center",
              background: "#fff",
              padding: "10px",
              borderRadius: "5px"
            }}
          >
            {this.state.data.title}
          </h2>
          <p>
            <span style={{ marginRight: "50px" }}>
              题量:{this.state.data.number}
            </span>
            <span style={{ marginRight: "50px" }}>
              开始时间:{this.state.data.start_time}
            </span>
            <span>结束时间:{this.state.data.end_time}</span>
          </p>
          <div className="main">
            <div className="m_left">
              {this.state.data.questions &&
                this.state.data.questions.map((item, index) => (
                  <div className="item" key={index}>
                    <p style={{ fontSize: "20px" }}>
                      {item.exam_name}

                      <span style={{ fontSize: "12px" }}>
                        ({item.questions_type_text})
                      </span>
                    </p>
                    <p>
                      <span style={{ fontSize: "18px" }}>{item.title}</span>
                      <span style={{ fontSize: "12px", marginLeft: "10px" }}>
                        出题人:{item.user_name}
                      </span>
                    </p>
                    <p>
                      <span style={{ paddingRight: "20px" }}>{index + 1}.</span>
                      {item.questions_stem}
                    </p>
                    <div>
                      <p>1.内容内容内容内容内容内容内容</p>
                      <p>2.内容内容内容内容内容内容内容</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="m_right">
              <p>
                <b>答案信息</b>
              </p>

              {this.state.data.questions &&
                this.state.data.questions.map((item, index) => (
                  <div
                    style={{
                      background: "#f7f9fa",
                      padding: "6px",
                      marginBottom: "50px"
                    }}
                    key={item.questions_answer}
                  >
                    {item.questions_answer}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    let { data } = this.state;
    data = { ...this.props.history.location.state };
    this.setState({
      data
    });
  }
}

export default Testdetail;
