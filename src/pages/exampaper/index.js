import React from "react";
import http from "../../http";
import "./style.css";
import { Tag } from "antd";

class Showidentity extends React.Component {
  constructor() {
    super();
    this.state = {
      arrlist: {}
    };
  }
  render() {
    return (
      <div className="wy_exampaper">
        {this.state.arrlist ? (
          <div className="wy_exambox">
            <div className="wy_examtitle">{this.state.arrlist.title}</div>
            <div className="wy_examques">
              {this.state.arrlist.questions
                ? this.state.arrlist.questions.map((item, index) => {
                    return (
                      <div className="wy_examtitlebox" key={index}>
                        <p className="wy_examtitlet">
                          {index + 1}. {item.questions_stem}
                        </p>
                        <div className="tagname">
                          <Tag color="volcano">{item.questions_type_text}</Tag>
                          <Tag color="orange">{item.title}</Tag>
                          <Tag color="gold">{item.subject_text}</Tag>
                          <Tag color="lime">{item.exam_name}</Tag>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
  componentDidMount() {
    var that = this;
    var name = this.props.location.search.slice(
      1,
      this.props.location.search.length
    );
    http
      .get("/exam/exam/" + name, {})
      .then(res => {
        that.setState({ arrlist: res.data });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    console.log(name);
  }
}

export default Showidentity;
