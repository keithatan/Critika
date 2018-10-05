import React from 'react'
import './App.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, Menu, Dropdown, message,   } from 'antd';

const FormItem = Form.Item;

//const Option = Select.Option;
class Register extends React.Component{


  // state = {
  //   confirmDirty: false,
  // };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log('Received values of form: ', values);
  //       const postdata = async () => {
  //         const data = axios.post('http://localhost:5000/register', {
  //           username: values.userName,
  //          // password: values.password
  //          // confirmpassword: values. 
  //         })
  //           .then(function (response) {
  //             console.log(response);
  //           })
  //           .catch(function (error) {
  //             console.log(error);
  //           });
  //         return data;
  //       }
  //     }
  //     else {
  //       console.log(err)
  //     }
  //   });
  // }


  // handleConfirmBlur = (e) => {
  //   const value = e.target.value;
  //   this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  // }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  // validateToNextPassword = (rule, value, callback) => {
  //   const form = this.props.form;
  //   if (value && this.state.confirmDirty) {
  //     form.validateFields(['confirm'], { force: true });
  //   }
  //   callback();
  // }



  render() {
      const menu = (
        <Menu>
          <Menu.Item>
            <a>What is your mother's maiden name?</a>
          </Menu.Item>
          <Menu.Item>
            <a>What is the name of your elementary school you went to?</a>
          </Menu.Item>
          <Menu.Item>
            <a>What is the name of your favorite drink?</a>
          </Menu.Item>
        </Menu>
      );
  
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
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input placeholder="Username" type="text"/>
          )}      
          </FormItem>
      
          <FormItem
            {...formItemLayout}
            label="Password"
          >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
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
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" placeholder="Confirm Password" onBlur={this.handleConfirmBlur} />
          )}          
          </FormItem>
  
          <FormItem
            {...formItemLayout}
            label="E-mail"
          >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input placeholder="Email" type="text"/>
          )}          
          </FormItem>
          
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                Security Question&nbsp;
                <Tooltip title="Write a question only you can answer">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
        
            
            )}
          >
         <Dropdown overlay={menu}>
        <Button >
          Choose a Security Question <Icon type="down" />
        </Button>
      </Dropdown>
          </FormItem>
  
           <FormItem
            {...formItemLayout}
            label="Answer to Security Question"
          >
          {getFieldDecorator('securityQuestionAnswer', {
            rules: [{ required: true, message: 'Security Question Answer is Required' }],
          })(
            <Input placeholder="Security Question Answer" type="text"/>
          )}            
          </FormItem>
  
    
          <FormItem {...tailFormItemLayout}>
              <Checkbox>I have read the <a href="">agreement</a></Checkbox>
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Register</Button>
          </FormItem>
        </Form>
        </div>
      
    );
  }
}

const RegisterForm = Form.create()(Register);

export default RegisterForm