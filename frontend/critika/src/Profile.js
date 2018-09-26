import React from 'react'
import './App.css'
import { Card, Icon, Col, Row, Button } from 'antd'

class Profile extends React.Component{
    
  render(){
  return (
    <div>
<<<<<<< HEAD
      <h1>User Profile <Button style={{backgroundColor: 'rgb(194, 165, 211)'}} type="secondary" size="large">+ Add Friend</Button> </h1>
=======
      <h1>User Profile <Button type="primary" size="large">+ Add Friend</Button> <Button type="primary" size="large">Submissions</Button> </h1>
>>>>>>> 9b67e6cab82e6307db260a3bbce7141ccbda5f4f
      
      <div style={{ background: '#ECECEC', padding: '30px' }}>
    <Row gutter={16}>
      <Col span={8}>
      <Card title="Critika Score" bordered={false} style={{ width: 250 }}>

<p><Icon type="star" theme="filled" />
<Icon type="star" theme="filled" />
<Icon type="star" theme="filled" />
<Icon type="star" theme="filled" />
<Icon type="star" theme="outlined" />
<h1> 4.0 </h1></p>


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