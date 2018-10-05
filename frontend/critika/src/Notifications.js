import React from 'react'
import './App.css'
import {Card, Button} from 'antd'

class Notifications extends React.Component{
  render(){
  return (
    <div>
      <h1>Notifications</h1>
        <Card title="Message" bordered={false}>
            <p>User A sent you a message:</p>
            <p>"Hello, I critka'd your post! Well done!</p>
        </Card>
        <p></p>
        <Card title="Feedback Received" bordered={false}>
            <p>User A critiqued your submission</p>
        </Card>
        <p></p>
        <Card title="Likes" bordered={false}>
            <p>12 people liked your submission</p>
        </Card>
        <p></p>
        <Card title="Friend Request" bordered={false}>
            <p>User B wants to be your friend!</p>
            <Button type="primary" size="medium">+ Add Friend</Button> 
        </Card>
        <p></p>
        <Card title="Rating" bordered={false}>
            <p>User C rated you a 2.0/5.0</p>
        </Card>
        <p></p>
        <Card title="Badge Earned" bordered={false}>
            <p>You earned a badge for adding your 100th friend</p>
        </Card>
        <p></p>

    </div>
  );
  }
} 

export default Notifications