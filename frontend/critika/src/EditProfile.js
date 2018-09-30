import React from 'react'
import './App.css'

import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, Menu, Dropdown, message  } from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;
class EditProfile extends React.Component{


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
      <div>
      <Form onSubmit={this.handleSubmit}>

      <FormItem 
          {...formItemLayout}
          label="Change Username"
        >
        <Input placeholder="Type your new username" />
    
        </FormItem>

          <FormItem 
          {...formItemLayout}
          label="Change Password"
        >
        <Input placeholder="Type your new password" />
    
        </FormItem>


  
      </Form>
      </div>
    );
  }
}


export default EditProfile