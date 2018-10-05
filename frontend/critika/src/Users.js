import React from 'react'
import './App.css'
import { Input, Menu, Dropdown, Icon, Row, Col, Card } from 'antd'
import profilePic from './defaultprofile.jpg'


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
      const optionMenu = (
        <Menu>
          <Menu.Item>
            <a>Ban</a>
          </Menu.Item>
          <Menu.Item>
            <a>Suspend</a>
          </Menu.Item>
          <Menu.Item>
            <a>Message</a>
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
        <p><img style={{ height: '5em', borderRadius: '0.9em' }} src={profilePic}/>User 1</p>
        <Dropdown overlay={optionMenu}>
        <a className="ant-dropdown-link" href="#">
          Actions <Icon type="down" />
        </a>
      </Dropdown>
        
        </Card>
        <p></p>
        <Card title="User3" bordered={false} style={{borderRadius: '0.9em' }}>
        <p><img style={{ height: '5em', borderRadius: '0.9em' }} src={profilePic}/>User 3</p>
        <Dropdown overlay={optionMenu}>
        <a className="ant-dropdown-link" href="#">
          Actions <Icon type="down" />
        </a>
      </Dropdown>
        </Card>
        <p></p>

        <Card title="User5" bordered={false} style={{borderRadius: '0.9em' }}>
        <p><img style={{ height: '5em', borderRadius: '0.9em' }} src={profilePic}/>User 5</p>
        <Dropdown overlay={optionMenu}>
        <a className="ant-dropdown-link" href="#">
          Actions <Icon type="down" />
        </a>
      </Dropdown>
        </Card>
        <p></p>

        <Card title="User7" bordered={false} style={{borderRadius: '0.9em' }}>
        <p><img style={{ height: '5em', borderRadius: '0.9em' }} src={profilePic}/>User 7</p>
        <Dropdown overlay={optionMenu}>
        <a className="ant-dropdown-link" href="#">
          Actions <Icon type="down" />
        </a>
      </Dropdown>
        </Card>
      </Col>
      <Col span={12}>
        <Card title="User2" bordered={false} style={{borderRadius: '0.9em' }}>
        <p><img style={{ height: '5em', borderRadius: '0.9em' }} src={profilePic}/>User 2</p>
        <Dropdown overlay={optionMenu}>
        <a className="ant-dropdown-link" href="#">
          Actions <Icon type="down" />
        </a>
      </Dropdown>
        </Card>
        <p></p>

        <Card title="User4" bordered={false} style={{borderRadius: '0.9em' }}>
        <p><img style={{ height: '5em', borderRadius: '0.9em' }} src={profilePic}/>User 4</p>
        <Dropdown overlay={optionMenu}>
        <a className="ant-dropdown-link" href="#">
          Actions <Icon type="down" />
        </a>
      </Dropdown>
        </Card>
        <p></p>

        <Card title="User6" bordered={false} style={{borderRadius: '0.9em' }}>
        <p><img style={{ height: '5em', borderRadius: '0.9em' }} src={profilePic}/>User 6</p>
        <Dropdown overlay={optionMenu}>
        <a className="ant-dropdown-link" href="#">
          Actions <Icon type="down" />
        </a>
      </Dropdown>
        </Card>
        <p></p>

        <Card title="User8" bordered={false} style={{borderRadius: '0.9em' }}>
        <p><img style={{ height: '5em', borderRadius: '0.9em' }} src={profilePic}/>User 8</p>
        <Dropdown overlay={optionMenu}>
        <a className="ant-dropdown-link" href="#">
          Actions <Icon type="down" />
        </a>
      </Dropdown>
        </Card>
      </Col>
     
    </Row>
    </div>
    </div>
    
  );
  }
} 

export default Users