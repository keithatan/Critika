import React from 'react'
import './App.css'
import {Row, Col, Card} from 'antd'

class Reports extends React.Component{
  render(){
  return (
    <div>
      <h1>Reports</h1>
      <div style={{ background: '#ECECEC', padding: '30px' }}>
      <Row gutter={16}>
      <Col span={12}>
        <Card title="Reported Submissions" bordered={false}>
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
        <Card title="Reported Comments" bordered={false}>
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
    </div>
  );
  }
} 

export default Reports