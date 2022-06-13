import React, { Component } from "react";
import {
    Form,
    Input,
    Button,
    Toast
  } from 'antd-mobile'
import './login.less';

import { Values, LoginData } from "../../../../src/interfaces";
import {getLogin} from '../../../../src/api'
export default class Login extends Component {
	 onFinish = async (values: Values) => {
		console.log('onFilinish', values);
		const loginData: LoginData = {
      username: values.username,
      password: values.password,
      client_id: 'ioros',
      client_secret: '123',
      grant_type: 'password',
    };
		console.log('loginData', loginData)
    try {
      const res = await getLogin(loginData);
    } catch (error) {
      console.log('loginData', error)
    }
    window.location.href = '/home'
	}
	onFinishFailed= () => {
	}
  render() {
    return (
      <div className="login">
        <Form
        layout='horizontal'
        footer={
          <Button block type='submit' color='primary' size='large'>
            提交
          </Button>
        }
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Header>登录</Form.Header>
        <Form.Item
          name='username'
          label='用户名'
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input onChange={console.log} placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item
            label='密码'
            name='password'
            rules={[{ required: true, message: '密码不能为空' }]}
        >
        <Input placeholder='请输入密码' clearable type='password' />
        </Form.Item>
      </Form>
      </div>
    );
  }
}
