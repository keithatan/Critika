import React from 'react'
import './App.css'
import {Button, Icon} from 'antd'
import {Link} from 'react-router-dom'

class Dashboard extends React.Component{
  render(){
  return (
    <div>
      <h1>Dashboard</h1>
      {/* <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Username" /> */}


      <Button type="primary">
            <Icon type="left" />Return to Profile
          </Button>
 
    </div>
  );
  }
} 

export default Dashboard