import React from "react";
import "./style.css";
import { Select,message } from "antd";


import http from "../../http";

const Option = Select.Option;
const success = (mes) => {
  message.success(mes);
};

const error = () => {
  message.error('This is a message of error');
};
class Adduser extends React.Component {
  constructor() {
    super();
    this.state = {
      identity: "",
      identitytwo: "",
      userid: "",
      identitylist: [],
      userlist: [],
      useridentity:[],
      useridentitylist:[],
      useridentitys:'',
      userauthority:'',
      viewauthority:[],
      viewidentitys:''
    };
  }
  render() {
    return (
      <div className="wy_addusers">
        <div className="wy_add">
          <p className="user">添加角色</p>
          <div className="wy_username">
            <span>姓名：</span>
            <input
              type="text"
              placeholder="请输入姓名"
              ref={name => (this.name = name)}
            />
          </div>
          <div className="wy_password">
            <span>密码:</span>
            <input
              type="text"
              placeholder="请输入姓名"
              ref={name => (this.pas = name)}
            />
          </div>
          <div className="wy_chooseuserrole">
            <Select
              defaultValue=""
              style={{ width: 120 }}
              onChange={this.handleChange}
            >
              {this.state.identitylist.length > 0 ? (
                this.state.identitylist.map(item => {
                  return (
                    <Option value={item.identity_text} key={item.identity_id}>
                      {item.identity_text}
                    </Option>
                  );
                })
              ) : (
                <Option value="管理员">管理员</Option>
              )}
            </Select>
          </div>
          <div className="wy_getmesgadduser">
            <button onClick={this.getadd}>提交</button>
          </div>
        </div>
        <div className="wy_identity wy_add">
          <p className="user">更改信息</p>
          <Select
            defaultValue=""
            style={{ width: 120 }}
            onChange={this.usermesChange}
          >
            {this.state.userlist.length > 0 ? (
              this.state.userlist.map(item => {
                return (
                  <Option value={item.user_name} key={item.user_id}>
                    {item.user_name}
                  </Option>
                );
              })
            ) : (
              <Option value="管理员">管理员</Option>
            )}
          </Select>
          <div className="wy_username">
            <span>姓名：</span>
            <input
              type="text"
              placeholder="请输入姓名"
              ref={name => (this.identityname = name)}
            />
          </div>
          <div className="wy_password">
            <span>密码:</span>
            <input
              type="text"
              placeholder="请输入姓名"
              ref={name => (this.identitypas = name)}
            />
          </div>
          <div className="wy_chooseuserrole">
            <Select
              defaultValue=""
              style={{ width: 120 }}
              onChange={this.identityChange}
            >
              {this.state.identitylist.length > 0 ? (
                this.state.identitylist.map(item => {
                  return (
                    <Option value={item.identity_text} key={item.identity_id}>
                      {item.identity_text}
                    </Option>
                  );
                })
              ) : (
                <Option value="管理员">管理员</Option>
              )}
            </Select>
          </div>
          <div className="wy_getmesgadduser">
            <button onClick={this.changeidentity}>提交</button>
          </div>
        </div>
        <div className="wy_changeidentity wy_add">
        <p className="user">添加身份</p>
        <div className="wy_username">
            <span>姓名：</span>
            <input
              type="text"
              placeholder="请输入身份名称"
              ref={userrole => (this.userrole = userrole)}
            />
          </div>
          <div className="wy_getmesgadduser">
            <button onClick={this.changeuserrole}>提交</button>
          </div>
        </div>
        <div className="wy_changeuseridentity wy_add">
        <p className="user">给身份设置接口权限</p>
        <div className="wy_centerbox">身份id<Select
              defaultValue=""
              style={{ width: 120 }}
              onChange={this.userauthorityChange}
            >
              {this.state.identitylist.length > 0 ? (
                this.state.identitylist.map(item => {
                  return (
                    <Option value={item.identity_text} key={item.identity_id}>
                      {item.identity_text}
                    </Option>
                  );
                })
              ) : (
                <Option value="管理员">管理员</Option>
              )}
            </Select></div>
          <div className="wy_centerbox">接口权限<Select
            defaultValue=""
            style={{ width: 120 }}
            onChange={this.useridentityChange}
          >
            {this.state.useridentitylist.length > 0 ? (
              this.state.useridentitylist.map((item,index) => {
                return (
                  <Option value={item.api_authority_id} key={item.api_authority_id}>
                    {item.api_authority_text}
                  </Option>
                );
              })
            ) : (
              <Option value="管理员">管理员</Option>
            )}
          </Select>
          </div>
          <div className="wy_getmesgadduser">
            <button onClick={this.changeuseridentity}>提交</button>
          </div>
        </div>
        <div className="wy_changeuseridentity wy_add">
        <p className="user">给身份设置视图权限</p>
        <div className="wy_centerbox">身份id<Select
              defaultValue=""
              style={{ width: 120 }}
              onChange={this.userauthorityChange}
            >
              {this.state.identitylist.length > 0 ? (
                this.state.identitylist.map(item => {
                  return (
                    <Option value={item.identity_text} key={item.identity_id}>
                      {item.identity_text}
                    </Option>
                  );
                })
              ) : (
                <Option value="管理员">管理员</Option>
              )}
            </Select></div>
          <div className="wy_centerbox">视图权限<Select
            defaultValue=""
            style={{ width: 120 }}
            onChange={this.viewidentityChange}
          >
            {this.state.viewauthority.length > 0 ? (
              this.state.viewauthority.map((item,index) => {
                return (
                  <Option value={item.view_authority_id} key={item.view_authority_id}>
                    {item.view_authority_text}
                  </Option>
                );
              })
            ) : (
              <Option value="管理员">管理员</Option>
            )}
          </Select>
          </div>
          <div className="wy_getmesgadduser">
            <button onClick={this.changeviewidentity}>提交</button>
          </div>
        </div>
        <div className="wy_changeuseridentity wy_add">
        <p className="user">添加视图接口权限</p>
        <div className="wy_centerbox">视图权限<Select
            defaultValue=""
            style={{ width: 120 }}
            onChange={this.viewidentityChange}
          >
            {this.state.viewauthority.length > 0 ? (
              this.state.viewauthority.map((item,index) => {
                return (
                  <Option value={item.view_authority_id} key={item.view_authority_id}>
                    {item.view_authority_text}
                  </Option>
                );
              })
            ) : (
              <Option value="管理员">管理员</Option>
            )}
          </Select></div>
          
          <div className="wy_getmesgadduser">
            <button onClick={this.changeviewidentity}>提交</button>
          </div>
        </div>
        <div className="wy_add wy_addapi">
          <p className="user">添加api接口权限</p>
          <div className="wy_username">
            <span>权限名称：</span>
            <input
              type="text"
              placeholder="请输入权限名称"
              ref={idenname => (this.idenname = idenname)}
            />
          </div>
          <div className="wy_username">
            <span>权限api：</span>
            <input
              type="text"
              placeholder="请输入权限api"
              ref={api => (this.api = api)}
            />
          </div>
          <div className="wy_username">
            <span>权限方法：</span>
            <input
              type="text"
              placeholder="请输入权限方法"
              ref={candoes => (this.candoes = candoes)}
            />
          </div>
          <div className="wy_getmesgadduser">
            <button onClick={this.addapi}>提交</button>
          </div>
        </div>      
      </div>
    );
  }
  componentDidMount() {
    http.get("/user/identity", {}).then(res => {
      this.setState({ identitylist: res.data });
    });
    http.get("/user/user").then(res => {
      this.setState({ userlist: res.data });
    });
    http.get("/user/api_authority").then(res => {
      console.log(res)
      this.setState({ useridentitylist: res.data });
    });
    http.get("/user/view_authority").then(res => {
      console.log(res)
      this.setState({ viewauthority: res.data });
    });
    http.get("/user/userInfo").then(res => {
      console.log(res)
    });
  }
  usermesChange = value => {
    var val = [],
      meg = {};
    http.get("/user/user", {}).then(res => {
      console.log(res);

      var val = res.data.filter(item => {
        return item.user_name === value;
      });
      console.log(val);

      this.setState({ userid: val[0].user_id });
    });
  };
  handleChange = value => {
    this.setState({ identity: value });
  };
  identityChange = value => {
    this.setState({ identitytwo: value });
  };
  changeidentity = () => {
    var val = [],
      meg = {};
    http.get("/user/user", {}).then(res => {
      val = res.data.filter(item => {
        return item.user_name === this.identityname.value;
      });

      http
        .put("/user/user", {
          user_id: this.state.userid,
          user_name: this.identityname.value,
          user_pwd: this.identitypas.value,
          identity_id: this.state.identitytwo
            ? this.state.identitytwo
            : "管理员"
        })
        .then(resole => {
          console.log(resole);
        });
    });
  };
  getadd = () => {
    console.log(this.pas.value);
    console.log(this.name.value);
    if (this.pas.value.trim()) {
      if (this.name.value.trim()) {
        if (this.state.identity) {
          http
            .post("/user", {
              user_name: this.name.value,
              user_pwd: this.pas.value,
              identity_id: this.name.value
            })
            .then(res => {
              console.log(res);
              if (res.code == 0) {
                alert(
                  "请正确更改用户名密码格式为 用户：请输入4到16位（字母，数字，下划线，减号）格式的用户名 密码：您的密码应该最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符"
                );
              } else {
                alert("添加成功");
                this.props.history.push("/exam/role");
              }
            });
        } else {
          alert("请选择权限");
        }
      } else {
        alert("请正确填写密码");
      }
    } else {
      alert("请正确填写姓名");
    }
  };
  changeuserrole=()=>{
    http.get('/user/identity/edit',{identity_text:this.userrole.value}).then(res=>{
      console.log(res)
      success('添加身份成功')
    }).catch(err=>{
      console.log(err)
      error(err)
    })
  }
  useridentityChange=(e)=>{
    console.log(e)
    this.setState({useridentitys:e})
  }
  userauthorityChange=(e)=>{
    console.log(e)
    this.setState({userauthority:e})
  }
  changeuseridentity=()=>{
    http.post('/user/setIdentityApi',{identity_id:this.state.userauthority,api_authority_id:this.state.useridentitys}).then((res)=>{
      success('api权限添加成功！')
    }).catch((err)=>{
      error(err)
    })
  }
  viewidentityChange=(e)=>{
    this.setState({viewidentitys:e})
  }
  changeviewidentity=()=>{
    http.post('/user/setIdentityView',{identity_id:this.state.userauthority,view_authority_id:this.state.viewidentitys}).then((res)=>{
      success('身份设置视图权限成功！')
    }).catch((err)=>{
      error(err)
    })
  }
  addapi=()=>{
    http.get('/user/authorityApi/edit',{api_authority_text:this.idenname,api_authority_url:this.api,api_authority_mehtod:this.candoes}).then((res)=>{
      success('身份设置视图权限成功！')
    }).catch((err)=>{
      error('身份设置失败')
      console.log(err)
    })
  }
}

export default Adduser;
