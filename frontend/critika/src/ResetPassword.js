import React from 'react'
import './App.css'
import { Form, Icon, Input, Button, Col } from 'antd';
import axios from 'axios'
import {Link} from 'react-router-dom'

const FormItem = Form.Item;

class ResetPassword extends React.Component{
    sendNewPassword = async (newPassword, confirmNewPassword) => {
        try {
          return await axios.post('http://localhost:3000/resetPassword', {
           // username: userName,
            //password: password
            newpassword: newPassword,
            confirmpassword: confirmNewPassword
          })
        } catch (err) {
          console.log(err)
        }
      }
    
      handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            const response = await this.sendNewPassword(values.newPassword, values.confirmNewPassword)
          }
          else {
            console.log(err)
          }
        });
      }
    


  render(){
    const { getFieldDecorator } = this.props.form;
  return (
    <Col span={8} offset={8}>
    <Form style={{width: "300px", textAlign: "center"}} onSubmit={this.handleSubmit} className="resetpassword-form">
        <FormItem >
            {/* <Input placeholder="New Password" /> */}
            {getFieldDecorator('newPassword', {
            rules: [{ required: true, message: 'Please input your new password!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="New Password" />
          )}

        </FormItem>

        <FormItem>
            {/* <Input placeholder="New Password" /> */}
            {getFieldDecorator('confirmNewPassword', {
            rules: [{ required: true, message: 'Please confirm your new password!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm New Password" />
          )}
        </FormItem>

        <FormItem>
            <p>
              <Button type="primary" htmlType="submit" className="resetpassword-form-button">
            Reset Password
             </Button>
          </p>
        </FormItem>
      </Form>
      </Col>
  );
  }
} 
const ResetPasswordForm = Form.create()(ResetPassword);

export default ResetPasswordForm