import React from 'react'
import './App.css'
import axios from 'axios'
import { Form, Input, Tooltip, Icon, Select, Checkbox, Button, Alert } from 'antd';
import { Redirect } from 'react-router-dom'
const FormItem = Form.Item;
const Option = Select.Option;


class Register extends React.Component {

  state = {
    success: false,
    redirect: false
  }

  sendRegister = async (userName, password, email, securityQuestion, securityQuestionAnswer) => {
    try {
      return await axios.post('http://localhost:5000/user/register', {
        username: userName,
        password: password,
        email: email,
        securityquestion: securityQuestion,
        securityquestionanswer: securityQuestionAnswer
      })
    } catch (err) {
      console.log(err.response.data)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const response = await this.sendRegister(values.userName, values.password, values.email, values.securityQuestion, values.securityQuestionAnswer)
        console.log(response)
        if (response != undefined) {
          this.setState({ success: true })
        }
      }
      else {
        console.log(err)
      }
    });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('The two passwords entered do not match.');
    } else {
      callback();
    }
  }

  validatePassword = (rule, value, callback) => {
    if (value.length < 8) {
      callback('Password length must be 8 or more characters long.');
    }
    else {
      callback();
    }
  }

  validateUsername = (rule, value, callback) => {
    if (value.length < 8) {
      callback('Username length must be 8 or more characters long.');
    }
    else {
      callback();
    }
  }

  handleClose = () => {
    this.setState({ redirect: true });
  }

  render() {

    const { success, redirect } = this.state;

    if (redirect) {
      return <Redirect to='/login' />
    }

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>

          <FormItem
            {...formItemLayout}
            label="Username"
          >
            {getFieldDecorator('userName', {
              rules: [{
                required: true, message: 'Please input your username.'
              }, {
                validator: this.validateUsername
              }]
            })(
              <Input placeholder="Username" type="text" />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Password"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password.'
              },
              {
                validator: this.validatePassword
              }],
            })(
              <Input type="password" placeholder="Password" />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Confirm Password"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password.',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" placeholder="Confirm Password" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>

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
            label={(
              <span>
                Security Question&nbsp;
                <Tooltip title="Pick a question that only you can answer.">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
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
              rules: [{ required: true, message: 'Please answer the secutiry question.' }],
            })(
              <Input placeholder="Security Question Answer" type="text" />
            )}
          </FormItem>


          <FormItem {...tailFormItemLayout}>
            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Register</Button>
          </FormItem>
          {success ? (
            <Alert
            message="Success!"
            description="Account has been successfully created! You'll have to verify your email first. Check your email for the four digit verifivation code and head to the login page."
            type="success"
            showIcon
            banner
            closable
            afterClose={this.handleClose}
          />
          ) : (null)}
        </Form>
      </div>

    );
  }
}

const RegisterForm = Form.create()(Register);

export default RegisterForm