import React from 'react'
import './App.css'
import axios from 'axios'
import {Form, Input, Button, Icon, Card, Checkbox, Dropdown, Menu, Slider, Row, Col} from 'antd'
import {Link} from 'react-router-dom'
import thumbnail from './default image.jpg'


const FormItem = Form.Item;
const menu = (
    <Menu>
      <Menu.Item>
        <a>Category 1</a>
      </Menu.Item>
      <Menu.Item>
        <a>Category 2</a>
      </Menu.Item>
      <Menu.Item>
        <a>Category 3</a>
      </Menu.Item>
    </Menu>
  );

class CreateSubmission extends React.Component{

  state = {
    SubName: '',
    Category: '',
    SkillLevel: 0,
    feedbackYoureLookingFor: '',
    spendCoin: false
  
  }

  showState() {
    console.log(this.state)
  }

  sendSubmission = async (subName,feedWanted) => {
      try{

        return await axios.post('http://localhost:5000/submission/add', {
          Category: 'cate',
          submissionName: subName,
          submissionText: feedWanted,
        })
      }catch(err){
        
      }
    
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.sendSubmission(values.subName,values.feedWanted)
      }
      else {
        console.log(err)
      }
    });
  }

  changeName = (e) => {
    this.setState({SubName: "sfasdfas"})
  }

  render(){

    const {SubName} = this.state;
    console.log(SubName);

    const { TextArea } = Input;
    
    function onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    }
    
    const { getFieldDecorator } = this.props.form;

    return (
      
      <div>
        <Row>
          <h1>Upload Your Submission</h1>
          <div style={{ background: '#ECECEC', padding: '30px' }}>
      
            <Card title="New Submission" bordered={false} style={{ width: 900 }}>
        
              <Col span={8} offset={8}>
                <Form style={{width: "300px"}} onSubmit={this.handleSubmit}>

                  <FormItem style={{ width: 250 }} >
                  {getFieldDecorator('subName'
                    )(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Submission Name" />)}
                  </FormItem>

                  <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="#">
                    Categories <Icon type="down" />
                    </a>
                  </Dropdown>

                  <FormItem onSubmit={this.handleSubmit}>
                    {getFieldDecorator('feedWanted')(
                    <p>What kind of feedback are you looking for?
                      <TextArea rows={4}style={{ width: 250 }} />
                    </p>)}
                  </FormItem>
          
                  <img style={{ height: '13.4em', borderRadius: '0.9em' }} src={thumbnail}/>

                  <Button type="primary" >
                    Upload thumbnail
                  </Button>

                  <FormItem>
                  
                    <Checkbox onChange={onChange}>Spend Coin on Submission</Checkbox>

                    <Button type="primary" htmlType="submit" >
                      Create Submission
                    </Button>

                  </FormItem>
              </Form>
            </Col>
          </Card>
        
        </div>
      </Row>
    </div>
  );
  }
} 

const CForm = Form.create()(CreateSubmission);

export default CForm;