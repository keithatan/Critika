import React from 'react'
import './App.css'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {Link} from 'react-router-dom'

const FormItem = Form.Item;

class ResetPassword extends React.Component{
  render(){
  return (
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
  );
  }
} 

export default ResetPassword