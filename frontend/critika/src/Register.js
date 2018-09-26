import React from 'react'
import './App.css'

import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
class Register extends React.Component{


  state = {
    confirmDirty: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }



  render() {

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

    return (
      <Form onSubmit={this.handleSubmit}>

      <FormItem 
          {...formItemLayout}
          label="Username"
        >
        <Input placeholder="Username" />
    
        </FormItem>
    
        <FormItem
          {...formItemLayout}
          label="Password"
        >
        <Input placeholder="Password" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
         <Input placeholder="E-mail" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirm Password"
        >
         <Input placeholder="Confirm Password" />
        </FormItem>
        
        <FormItem {...tailFormItemLayout}>
            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
        </FormItem>
      </Form>
    );
  }
}


export default Register