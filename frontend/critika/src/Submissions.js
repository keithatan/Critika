import React from 'react'
import './App.css'
import './Submissions.css'
import { Carousel, Menu, Dropdown, Icon } from 'antd'

class Submissions extends React.Component{
    
    
  render(){
    function onChange(a, b, c) {
        console.log(a, b, c);
      }

      const menu = (
        <Menu>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
          </Menu.Item>
          <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
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