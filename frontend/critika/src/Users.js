import React from 'react'
import './App.css'
import { Input, Menu, Dropdown, Icon } from 'antd'

class Users extends React.Component{
  render(){
    const menu = (
        <Menu>
          <Menu.Item>
            <a>Alphabetical</a>
          </Menu.Item>
          <Menu.Item>
            <a>Critika Score</a>
          </Menu.Item>
          <Menu.Item>
            <a>Mutual friends</a>
          </Menu.Item>
        </Menu>
      );
  return (
    <div>
      <h1>Users</h1>
      <Input placeholder="Search for users" />
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          Filter By <Icon type="down" />
        </a>
      </Dropdown>
    </div>
    
  );
  }
} 

export default Users