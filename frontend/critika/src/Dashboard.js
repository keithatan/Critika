import React from 'react'
import './App.css'
import {Button, Icon} from 'antd'
import {Link} from 'react-router-dom'

class Dashboard extends React.Component{
  render(){
  return (
    <div>
        <Button.Group size={"small"}>
          <Button class="profilebtn" type="default">
          <Icon type="left" theme="outlined" /> 
          <Link to="/Profile">Return to Profile Page</Link>
          </Button>
      </Button.Group>
 
      <h1>Dashboard</h1>
      {/* <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Username" /> */}


     
    </div>
  );
  }
} 

export default Dashboard