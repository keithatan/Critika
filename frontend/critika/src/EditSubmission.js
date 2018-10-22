import React from 'react'
import './App.css'
import {Form, Input, Button, Icon, Card, Checkbox, Dropdown, Menu, Slider} from 'antd'
import {Link} from 'react-router-dom'
import thumbnail from './default image.jpg'



const FormItem = Form.Item;

class EditSubmission extends React.Component{



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

      class IconSlider extends React.Component {
        state = {
          value: 0,
        }
      
        handleChange = (value) => {
          this.setState({ value });
        }
      
        render() {
          const { max, min } = this.props;
          const { value } = this.state;
          const mid = ((max - min) / 2).toFixed(5);
          const preColor = value >= mid ? '' : 'rgba(0, 0, 0, .45)';
          const nextColor = value >= mid ? 'rgba(0, 0, 0, .45)' : '';
          return (
            <div className="icon-wrapper">
              Skill Level <Slider {...this.props} onChange={this.handleChange} value={value} /> 
            </div>
          );
        }
      }


  return (
    <div>
      
      <div style={{ background: '#ECECEC', padding: '30px' }}>
      <Card title="Edit Submission" bordered={false} style={{ width: 900 }}>
      <Form style={{width: "300px", textAlign: "center"}}>
        <FormItem >
            <Input placeholder="Submission Name"/>
        </FormItem>
        <FormItem >
            <Input placeholder="Submission Category"/>
        </FormItem>

        <IconSlider min={0} max={20} />


      <p>What kind of feedback are you looking for?
      <TextArea rows={4} />
      </p>

      <img src={thumbnail}/>
      <Button type="primary" >
            Change thumbnail
             </Button>

        <FormItem>
           
              <Button type="primary" htmlType="submit" >
            Save Edits
             </Button>
            
         
        </FormItem>
      </Form>
        </Card>
        </div>

    </div>
  );
  }
} 

export default EditSubmission