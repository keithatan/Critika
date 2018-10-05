import React from 'react'
import './App.css'
import {Row, Col, Card} from 'antd'
import profilePic from './defaultprofile.jpg'

class Friends extends React.Component{
  render(){
  return (
    <div>
      <h1>You are friends with</h1>
      <div style={{ background: '#ECECEC', padding: '30px', borderRadius: '0.9em'  }}>
      <Row gutter={16}>
      <Col span={12}>
        <Card title="Friend1" bordered={false} style={{borderRadius: '0.9em' }}>
        
        <p><img style={{ height: '5em', borderRadius: '0.9em' }} src={profilePic}/> Friend 1</p>
        
        
        </Card>
        <p></p>
        <Card title="Friend3" bordered={false} style={{borderRadius: '0.9em' }}>
        <p><img style={{ height: '5em', borderRadius: '0.9em' }} src={profilePic}/>Friend 3</p>
        
        </Card>
        <p></p>

        <Card title="Friend5" bordered={false} style={{borderRadius: '0.9em' }}>
        <p><img style={{ height: '5em', borderRadius: '0.9em' }} src={profilePic}/>Friend 5</p>
        
        </Card>
        <p></p>

        <Card title="Friend7" bordered={false} style={{borderRadius: '0.9em' }}>
        <p><img style={{ height: '5em', borderRadius: '0.9em' }} src={profilePic}/>Friend 7</p>
        
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Friend2" bordered={false} style={{borderRadius: '0.9em' }}>
        <p><img style={{ height: '5em', borderRadius: '0.9em' }} src={profilePic}/>Friend 2</p>
        
        </Card>
        <p></p>

        <Card title="Friend4" bordered={false} style={{borderRadius: '0.9em' }}>
        <p><img style={{ height: '5em', borderRadius: '0.9em' }} src={profilePic}/>Friend 4</p>
        
        </Card>
        <p></p>

        <Card title="Friend6" bordered={false} style={{borderRadius: '0.9em' }}>
        <p><img style={{ height: '5em', borderRadius: '0.9em' }} src={profilePic}/>Friend 6</p>
        
        </Card>
        <p></p>

        <Card title="Friend8" bordered={false} style={{borderRadius: '0.9em' }}>
        <p><img style={{ height: '5em', borderRadius: '0.9em' }} src={profilePic}/>Friend 8</p>
        
        </Card>
      </Col>
     
    </Row>
    </div>
    </div>
    
  );
  }
} 

export default Friends