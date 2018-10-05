import React from 'react'
import './App.css'
import {Row, Col, Card} from 'antd'

class Friends extends React.Component{
  render(){
  return (
    <div>
      <h1>You are friends with</h1>
      <div style={{ background: '#ECECEC', padding: '30px' }}>
      <Row gutter={16}>
      <Col span={12}>
        <Card title="Friend1" bordered={false}>
        <p>Friend 1</p>
        
        
        </Card>
        <p></p>
        <Card title="Friend3" bordered={false}>
        <p>Friend 3</p>
        
        </Card>
        <p></p>

        <Card title="Friend5" bordered={false}>
        <p>Friend 5</p>
        
        </Card>
        <p></p>

        <Card title="Friend7" bordered={false}>
        <p>Friend 7</p>
        
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Friend2" bordered={false}>
        <p>Friend 2</p>
        
        </Card>
        <p></p>

        <Card title="Friend4" bordered={false}>
        <p>Friend 4</p>
        
        </Card>
        <p></p>

        <Card title="Friend6" bordered={false}>
        <p>Friend 6</p>
        
        </Card>
        <p></p>

        <Card title="Friend8" bordered={false}>
        <p>Friend 8</p>
        
        </Card>
      </Col>
     
    </Row>
    </div>
    </div>
    
  );
  }
} 

export default Friends