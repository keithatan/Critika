import React, { Component } from 'react';
import logo from './logo.svg';
import Login from './Login';
import Profile from './Profile';
import Groups from './Groups';
import Submissions from './Submissions';
import FeedbackGiven from './FeedbackGiven';
import Messages from './Messages';
import Friends from './Friends';
import Community from './Community';
import Explore from './Explore';

import './App.css';
import { Button, Layout, Menu, Breadcrumb, Icon } from 'antd';
import 'antd/dist/antd.css';
import { Link, Switch, Route, Redirect } from 'react-router-dom'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends Component {
  render() {
    return (
      
      <div>
       <Layout>
    <Header>
      
      <header className="App-header">
      CRITIKA
      </header>
      
  
    </Header>
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
            <Menu.Item key="1"><Link to="/login">Login</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/community">Community</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/explore">Explore</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/profile">Profile</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/groups">Groups</Link></Menu.Item>
            <Menu.Item key="7"><Link to="/messages">Messages</Link></Menu.Item>
            <Menu.Item key="8"><Link to="/submissions">Submissions</Link></Menu.Item>
            <Menu.Item key="8"><Link to="/feedbackGiven">FeedbackGiven</Link></Menu.Item>

        
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
        <Switch>
      
      <Route path='/login' render = { () => (
        <Login/>)} 
      />
      <Route path='/profile' render = { () => (
        <Profile/>)} 
      />
      <Route path='/groups' render = { () => (
        <Groups/>)} 
      />
      <Route path='/submissions' render = { () => (
        <Submissions/>)} 
      />
      <Route path='/feedbackGiven' render = { () => (
        <FeedbackGiven/>)} 
      />
      <Route path='/messages' render = { () => (
        <Messages/>)} 
      />
      <Route path='/friends' render = { () => (
        <Friends/>)} 
      />
      <Route path='/community' render = { () => (
        <Community/>)} 
      />
      <Route path='/explore' render = { () => (
        <Explore/>)} 
      />
       
    </Switch>
        </Content>
      </Layout>
    </Layout>
  </Layout>
       
      
      </div>
    
      
    );
  }
}


export default App;
