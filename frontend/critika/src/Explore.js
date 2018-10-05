import React from 'react'
import './App.css'
import {Menu, Dropdown, Icon} from 'antd'


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
class Explore extends React.Component{
  
  render(){
  return (
    <div>
      <p>Browse what's out there</p>
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          Categories <Icon type="down" />
        </a>
      </Dropdown>
    </div>
  );
  }
} 

export default Explore