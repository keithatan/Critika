import React from 'react'
import './App.css'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {Link} from 'react-router-dom'
import googlebutton from './login with google.png'
import githubbutton from './login with github.png'

const FormItem = Form.Item;

class Login extends React.Component{
  

  render() {
    return (
      <Form style={{width: "300px", textAlign: "center"}}>
        <FormItem >
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Username" />
        </FormItem>

        <FormItem>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)'}} />} type="password" placeholder="Password" />
        </FormItem>

        <FormItem>
            <Checkbox>Remember me</Checkbox>  
            {/* <a className="login-form-forgot" href="">Forgot password</a> */}
            <Link className="login-form-forgot" to="/resetPassword">Reset Password</Link>
            <p>
              <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
             </Button>
             Or  

             <Link to="/register">Register</Link>
             {/* <a href="">register now!</a> */}
          </p>
        </FormItem>
      </Form>
    );
  }
}


export default Login