import React from 'react'
import './App.css'
import './Submissions.css'
import { Carousel, Menu, Dropdown, Icon, Button } from 'antd'

class Submissions extends React.Component{
    
    
  render(){
    function onChange(a, b, c) {
        console.log(a, b, c);
      }

      const menu = (
        <Menu>
          <Menu.Item>
            <a>Most Recent</a>
          </Menu.Item>
          <Menu.Item>
            <a>Most Popular</a>
          </Menu.Item>
          <Menu.Item>
            <a>Top Rated</a>
          </Menu.Item>
        </Menu>
      );
  return (
      
    <div>
      <h1>Your submissions</h1>

      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          Submissions type <Icon type="down" />
        </a>
      </Dropdown>

      <Button type="primary">Remove Submission</Button>
      <Button type="primary">Edit Submission</Button>

      <Carousel afterChange={onChange}>
        <div><h3>1</h3></div>
        <div><h3>2</h3></div>
        <div><h3>3</h3></div>
        <div><h3>4</h3></div>
      </Carousel>

    </div>
  );
  }
} 

export default Submissions