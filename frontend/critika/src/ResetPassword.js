import React from 'react'
import './App.css'
import { Form, Select, Input, Button, Col, Alert } from 'antd';
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

const FormItem = Form.Item;
const Option = Select.Option;

class ResetPassword extends React.Component {
  A

  state = {
    success: false,
    failed: false, 
    redirect: false
  }


  sendNewPassword = async (email, securityQuestion, securityQuestionAnswer) => {
    try {
      return await axios.post('http://localhost:5000/user/reset-password-email', {
        email: email,
        security_question: securityQuestion,
        security_question_answer: securityQuestionAnswer
      })
    } catch (err) {
      console.log(err.response.data)
      this.setState({ failed: true, success: false })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const response = await this.sendNewPassword(values.email, values.securityQuestion, values.securityQuestionAnswer)
        console.log(response);
        if (response != undefined) {
          this.setState({ success: true, failed: false })
        }
      }
      else {
        console.log(err)
      }
    });
  }

  handleClose = (e) => {
    this.setState({ redirect: true })
  }

  render() {

    const { failed, success, redirect } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 32 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 32 },
        sm: { span: 8 },
      },
    };
    const { getFieldDecorator } = this.props.form;

    if (redirect) {
      return <Redirect to='/login' />
    }

    return (
      <Col span={32} offset={8}>
        <Form style={{ width: "300px", textAlign: "center" }} onSubmit={this.handleSubmit} className="resetpassword-form">
          <FormItem
            {...formItemLayout}
            label="Email"
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid Email.',
              }, {
                required: true, message: 'Please input your Email.',
              }],
            })(
              <Input placeholder="Email" type="text" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Security Question"
          >
            {getFieldDecorator('securityQuestion', {
              rules: [{ required: true, message: 'Please pick a security question.' }],
            })(
              <Select defaultValue="What is your mother's maiden name?" style={{ width: 300 }}>
                <Option value="What is the name of your favorite drink?">What is the name of your favorite drink?</Option>
                <Option value="What is your mother's maiden name?">What is your mother's maiden name?</Option>
                <Option value="What is the name of your elementary school you went to?">What is the name of your elementary school you went to?</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Answer to Security Question"
          >
            {getFieldDecorator('securityQuestionAnswer', {
              rules: [{ required: true, message: 'Please answer the security question.' }],
            })(
              <Input placeholder="Security Question Answer" type="text" />
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
        {failed ? (
          <Alert message="The security question or answer does not match our records" type="error" banner="true" />
        ) : success ? (
          <Alert
            message="Password Reset Success"
            description="Your password has been successfully reset. Check your email to find your new password."
            type="success"
            showIcon
            banner
            closable
            onClose={this.handleClose}
          />
        ) : (null)}
      </Col>
    );
  }
}
const ResetPasswordForm = Form.create()(ResetPassword);

export default ResetPasswordForm