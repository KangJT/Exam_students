import React from "react";
import "./style.css";
import "./font_779092_8emozmua56i/iconfont.css";
import http from '@/http'
import Loading from '../../components/loading'
import {message} from 'antd'

const warning = (meg) => {
  message.warning(meg);
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      istrue: false
    }
  }
  render() {
    return (
      <div className="wy_login">
        <div className="wy_loginbox">
          <p className="wy_title">登录</p>
          <div className="wy_username">
            <p className="wy_usernamecode">
              <i className="iconfont icon-yonghu-xianxing" />
              <input
                type="text"
                placeholder="用户名"
                ref={input => (this.name = input)}
              />
            </p>
          </div>
          <div className="wy_password">
            <p className="wy_passwordcode">
              <i className="iconfont icon-jiesuo" />
              <input
                type="text"
                placeholder="密码"
                ref={input => (this.pas = input)}
              />
            </p>
          </div>
          <button className="wy_tologin" onClick={this.login}>
            登录
          </button>
          <button className="wy_toregister">立即注册</button>
        </div>
        <Loading open={this.state.istrue} />
      </div>
    );
  }
  componentDidMount(){
    // console.log(this.props)
    // Cookie.del('userid')
  }
  login = () => {
    if (this.name.value.trim()) {
      if (this.pas.value.trim()) {
        let usermsg = http.post("/user/login", {
          user_name: this.name.value,
          user_pwd: this.pas.value
        });
        
    this.setState({ istrue: true });
        usermsg
          .then(data => {
            if (data.code === 1) {
              console.log(data)
              document.cookie = "userid=" + data.token;
                this.setState({ istrue: false });
                setTimeout(()=>{
                  this.props.history.push("/exam/questions");
                },1000)
            }
          })
          .catch(err => {
            alert("错误");

            this.setState({ istrue: false });
            console.log(err);
          });
      } else {
        alert("请填写密码");
      }
    } else {
      alert("请填写姓名");
    }
  };
}

export default Login;


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWduVGltZSI6MTU1MjgyMzc2MzMwMCwidXNlcl9pZCI6ImJ2ajJ5Yy1zdjA4cDkiLCJ1c2VyX25hbWUiOiJhYWFhYTEiLCJpZGVudGl0eV9pZCI6InVmODF5bi1odjh1dnYiLCJpZGVudGl0eV90ZXh0Ijoi5Ye66aKY6ICFIiwiaWF0IjoxNTUyODIzNzYzfQ.jH_KzpW8sFQNMrsWiebWMDkAFds0W2NO6we3lX9QxOo
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWduVGltZSI6MTU1MjgyMzgzOTAzOSwidXNlcl9pZCI6IjJveWt0OC1tbWN0aGMiLCJ1c2VyX25hbWUiOiJhYWFhYSIsImlkZW50aXR5X2lkIjoiNjNubzlwLTh5MGs0IiwiaWRlbnRpdHlfdGV4dCI6IueuoeeQhuWRmCIsImlhdCI6MTU1MjgyMzgzOX0.gjOZ59rBVsu4YbatvX0wDbmY2g4_1pb-mIvDWGdA4xE
