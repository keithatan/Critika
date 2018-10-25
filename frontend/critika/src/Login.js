import React from 'react'
import './App.css'
import axios from 'axios'
import { Form, Icon, Input, Button, Checkbox, Col, Alert } from 'antd';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import googlebutton from './login with google.png'
import githubbutton from './login with github.png'

const FormItem = Form.Item;

class Login extends React.Component {

  state = {
    redirect: false,
    failed: false
  }

  sendLogin = async (userName, password) => {
    try {
      return await axios.post('http://localhost:5000/user/login', {
        username: userName,
        password: password
      })
    } catch (err) {
      console.log(err.response.data)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const response = await this.sendLogin(values.userName, values.password)
        if (response != undefined) {
          this.setState({ redirect: true, failed: false })
        }
        else {
          this.setState({ failed: true })
        }
      }
      else {
        console.log(err)
      }
    });
  }

  render() {

    const { redirect, failed } = this.state;

    // if redirect is set, redirect to dashboard
    if (redirect) {
      return <Redirect to='/dashboard' />
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <Col span={8} offset={8}>
        <Form style={{ width: "300px", textAlign: "center" }} onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>

          <FormItem>
            <Checkbox>Remember me</Checkbox>
            <br></br>
            {/* <a className="login-form-forgot" href="">Forgot password</a> */}
            <p>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
             </Button>
              Or
             <Link to="/register">Register</Link>
              <h4>Forgot Password?</h4>
              <Link className="login-form-forgot" to="/resetPassword">Reset Password</Link>
              {/* <a href="">register now!</a> */}
            </p>
          </FormItem>
        </Form>
       {failed ? (
                    <Alert message="Username or Password is Incorrect" type="error" banner="true"/>
                    ) : (null)} 
      </Col>
    );
  }
}

const LoginForm = Form.create()(Login);

export default LoginForm