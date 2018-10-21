import React from 'react'
import './App.css'
import { Form, Icon, Input, Button, Col } from 'antd';
import {Link} from 'react-router-dom'

const FormItem = Form.Item;

class ResetPassword extends React.Component{
  render(){
  return (
    <Col span={8} offset={8}>
    <Form style={{width: "300px", textAlign: "center"}}>
        <FormItem >
            <Input placeholder="New Password" />
        </FormItem>

        <FormItem>
            <Input placeholder="Confirm New Password" />
        </FormItem>

        <FormItem>
            <p>
              <Button type="primary" htmlType="submit" className="login-form-button">
            Reset Password
             </Button>
          </p>
        </FormItem>
      </Form>
      </Col>
  );
  }
} 

export default ResetPassword