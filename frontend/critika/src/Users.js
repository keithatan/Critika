import React from 'react'
import './App.css'
import { Input, Menu, Dropdown, Icon, Row, Col, Card } from 'antd'

class Users extends React.Component{
  render(){
    const menu = (
        <Menu>
          <Menu.Item>
            <a>Alphabetical</a>
          </Menu.Item>
          <Menu.Item>
            <a>Critika Score</a>
          </Menu.Item>
          <Menu.Item>
            <a>Mutual friends</a>
          </Menu.Item>
        </Menu>
      );
  return (
    <div>
      <h1>Users</h1>
      <Input placeholder="Search for users" />
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          Filter By <Icon type="down" />
        </a>
      </Dropdown>
      <div style={{ background: '#ECECEC', padding: '30px', borderRadius: '0.9em'  }}>
      <Row gutter={16}>
      <Col span={12}>
        <Card title="User1" bordered={false} style={{borderRadius: '0.9em' }}>
        <p>User 1</p>
        
        
        </Card>
        <p></p>
        <Card title="User3" bordered={false} style={{borderRadius: '0.9em' }}>
        <p>User 3</p>
        
        </Card>
        <p></p>

        <Card title="User5" bordered={false} style={{borderRadius: '0.9em' }}>
        <p>User 5</p>
        
        </Card>
        <p></p>

        <Card title="User7" bordered={false} style={{borderRadius: '0.9em' }}>
        <p>User 7</p>
        
        </Card>
      </Col>
      <Col span={12}>
        <Card title="User2" bordered={false} style={{borderRadius: '0.9em' }}>
        <p>User 1</p>
        
        </Card>
        <p></p>

        <Card title="User4" bordered={false} style={{borderRadius: '0.9em' }}>
        <p>User 4</p>
        
        </Card>
        <p></p>

        <Card title="User6" bordered={false} style={{borderRadius: '0.9em' }}>
        <p>User 6</p>
        
        </Card>
        <p></p>

        <Card title="User8" bordered={false} style={{borderRadius: '0.9em' }}>
        <p>User 8</p>
        
        </Card>
      </Col>
     
    </Row>
    </div>
    </div>
    
  );
  }
} 

export default Users