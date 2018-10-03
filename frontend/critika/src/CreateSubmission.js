import React from 'react'
import './App.css'
import {Form, Input, Button, Icon, Card, Checkbox, Dropdown, Menu} from 'antd'
import {Link} from 'react-router-dom'
import thumbnail from './default image.jpg'



const FormItem = Form.Item;

class CreateSubmission extends React.Component{



  render(){
    const { TextArea } = Input;
    const menu = (
        <Menu>
          <Menu.Item>
            <a>Beginner</a>
          </Menu.Item>
          <Menu.Item>
            <a>Intermediate</a>
          </Menu.Item>
          <Menu.Item>
            <a>Expert</a>
          </Menu.Item>
        </Menu>
      );
  return (
    <div>
      <h1>Upload Your Submission</h1>
      <Button type="primary"> <Icon type="upload" />Upload Submission</Button>
      <div style={{ background: '#ECECEC', padding: '30px' }}>
      <Card title="New Submission" bordered={false} style={{ width: 900 }}>
      <Form style={{width: "300px", textAlign: "center"}}>
        <FormItem >
            <Input placeholder="Submission Name"/>
        </FormItem>
        <FormItem >
            <Input placeholder="Submission Category"/>
        </FormItem>

       <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          Proficiency Level <Icon type="down" />
        </a>
      </Dropdown>

      <p>What kind of feedback are you looking for?
      <TextArea rows={4} />
      </p>

      <img src={thumbnail}/>
      <Button type="primary" >
            Upload thumbnail
             </Button>

        <FormItem>
           
              <Button type="primary" htmlType="submit" >
            Create Submission
             </Button>
            
         
        </FormItem>
      </Form>
        </Card>
        </div>

    </div>
  );
  }
} 

export default CreateSubmission