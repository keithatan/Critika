import React from 'react'
import './App.css'

import { Form, Input, Select, Avatar, Button, Upload, Icon} from 'antd';


const FormItem = Form.Item;
const { TextArea } = Input;
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
    
    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 8 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 16 },
    //   },
    // };
    // const tailFormItemLayout = {
    //   wrapperCol: {
    //     xs: {
    //       span: 24,
    //       offset: 0,
    //     },
    //     sm: {
    //       span: 16,
    //       offset: 8,
    //     },
    //   },
    // };

    return (
      <div>
        <h1>Edit Your Profile</h1>
        <Avatar style={{float:"center"}} size={200} icon="user" />
        <br></br>
        <br></br>
        <Upload style={{float:"unset"}}>
          <Button>
            <Icon type="upload" /> Click to Upload
          </Button>
        </Upload>
      <Form onSubmit={this.handleSubmit}>

         <FormItem 
         // {...formItemLayout}
          label="Bio"
        >
        <Input placeholder="Type your bio" />
    
        </FormItem>

      <FormItem 
         // {...formItemLayout}
          label="About Me"
        >
        <TextArea rows={3} placeholder="Tell us about yourself" />
        </FormItem>
        <Button type="primary" htmlType="submit">Save Changes</Button>
      </Form>
      </div>
    );
  }
}


export default EditProfile