import React from 'react'
import './App.css'
import { Card, Icon, Col, Row, Button,Rate } from 'antd'
import { Link } from 'react-router-dom'

class Profile extends React.Component{
    
  render(){
  return (
    <div>
      <Button.Group size={"small"}>
          <Button class="profilebtn" type="default">
          <Icon type="left" theme="outlined" />
          <Link to="/Dashboard">Return to your Dashboard Page</Link>
          
          </Button>
      </Button.Group>
      <Link style={{float:"right"}} to="/editProfile"><Icon type="edit" theme="filled" />Edit Profile</Link>
      <h1>User Profile <Button type="primary" size="large">+ Add Friend</Button> 
      
      <Button type="primary" size="large"><Link to="/submissions">Submissions</Link></Button> </h1>
      <div style={{ background: '#ECECEC', padding: '30px' }}>
    <Row gutter={16}>
      <Col span={8}>
      <Card title="Critika Score" bordered={false} style={{ width: 250 }}>

    <Rate disabled defaultValue={2.5} />
    <h1>2.0</h1>

</Card>
      </Col>
      <Col span={8}>
      <Card title="Badges" bordered={false} style={{ width: 250 }}>

<p> Made 100 connections <Icon type="user" theme="outlined" /></p>
<p> Received 100 likes on comments<Icon type="like" theme="outlined" /></p>

</Card>
      </Col>
      <Col span={8}>
        <Card title="Personal Information" bordered={false}>
        <p>Member since: 9.24.18</p>
        <p>Number of friends: </p>
        <p>Number of submissions:</p>
        <p>Number of critiques given:</p>
        <p>Number of critiques received:</p>
        </Card>
      </Col>
    </Row>
  </div>,
      
    </div>
  );
  }
} 

export default Profile