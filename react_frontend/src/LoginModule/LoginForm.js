import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import request from '../Common/Utils/request';
import storage from '../Common/Utils/storage';
import './LoginForm.css';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(...props) {
    super(...props);
    this.handleLogin = this.handleLogin.bind(this);
    this.username = "";
  }

  state = {
    needLoading: false,
    errorMessage: ""
  };

  handleSubmit = (e) => {
    this.setState({ needLoading: true });
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let sendData = { username: values.username, password: values.password };
        let option = {
          method: 'POST',
          credentials: 'include',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sendData)
        };
        this.username = values.username;
        request('/api/LoginAction', option).then(this.handleLogin).catch(ex => {
          console.error('获取数据出错, ', ex.message);
        });
      }
    });
  }

  handleLogin = (response) => {
    debugger;
    if (response.status >= 200 && response.status < 300) {
      var data = response.json();
      console.log(data);
      this.setState({ needLoading: false });
      storage.local.set("username", this.username);
      this.props.history.push("/home"); //跳转页面
    }
    else {
      this.setState({ errorMessage: "无效的用户名或密码", needLoading: false });
    }

    return data;
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-outer">
        <div className="login-middle">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              <div className="login-logo">
                {this.state.errorMessage !== "" ? <Alert type='error' message={this.state.errorMessage} showIcon /> : null}
              </div>
            </FormItem>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名/邮箱!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名/邮箱" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(
                <Checkbox>记住我</Checkbox>
              )}
              <a className="login-form-forgot" href="">忘记密码</a>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.needLoading}>
                登录
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;