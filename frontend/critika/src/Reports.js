import React from 'react'
import './App.css'
import {Row, Col, Card, Button} from 'antd'
import { Link } from 'react-router-dom'

class Reports extends React.Component{
  render(){
  return (
    <div>
      <h1>Reports</h1>
      <div style={{ background: '#ECECEC', padding: '30px', borderRadius: '0.9em'  }}>
      <Row gutter={16}>
      <Col span={12}>
        <Card title="Reported Submissions" bordered={false}  style={{borderRadius: '0.9em' }}>
        <p>Submission 1</p>
        <p>Submission 2</p>
        <p>Submission 3</p>
        <p>Submission 4</p>
        <p>Submission 5</p>
        <p>Submission 6</p>
        <p>Submission 7</p>
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Reported Comments" bordered={false} style={{borderRadius: '0.9em' }}>
        <p>Comment 1</p>
        <p>Comment 2</p>
        <p>Comment 3</p>
        <p>Comment 4</p>
        <p>Comment 5</p>
        <p>Comment 6</p>
        <p>Comment 7</p>
        </Card>
      </Col>
     
    </Row>
    </div>
  <div style={{paddingTop: '20px'}}>
  <Button type="primary"><Link to="/FileReport"> File a Report </Link></Button>
  </div>
    
    </div>
  );
  }
} 

export default Reports