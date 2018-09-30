import React from 'react'
import './App.css'
import {Button} from 'antd'
import {Link} from 'react-router-dom'

class Dashboard extends React.Component{
  render(){
  return (
    <div>
      <h1>Dashboard</h1>
      <Button>
      <Link to="/profile">Profile</Link>
      </Button>
      
    </div>
  );
  }
} 

export default Dashboard