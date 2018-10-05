import React, { Component } from 'react';
import Login from './Login';
import Profile from './Profile';
import Groups from './Groups';
import Submissions from './Submissions';
import FeedbackGiven from './FeedbackGiven';
import Messages from './Messages';
import Friends from './Friends';
import Community from './Community';
import Explore from './Explore';
import Settings from './Settings';
import Notifications from './Notifications';
import Dashboard from './Dashboard';
import Register from './Register';
import Users from './Users';
import Reports from './Reports';
import ResetPassword from './ResetPassword';
import EditProfile from './EditProfile';
import CreateSubmission from './CreateSubmission';
import EditSubmission from './EditSubmission';
import './Login.css';
import './App.css';
import { Button, Layout, Menu, Breadcrumb, Icon, Form, Input, Col} from 'antd';
import 'antd/dist/antd.css';
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios';
import logo from './logo.svg'


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const FormItem = Form.Item;

class App extends Component {
  render() {
    return (
      
      <div>
       <Layout>
    <Header style={{backgroundColor: 'rgb(194, 165, 211)'}} >
      <header className="App-header">
      
      <Col span={4} offset={0}>
      CRITIKA
      </Col>
      <Col span={4} offset={16}>
      <Link  to='/dashboard'>
      <Icon className="Nav-bar" type="home" style={{ color: 'rgb(255,255,255)'}} />
        </Link>
      <Link  to='/profile'>
      <Icon className="Nav-bar" type="user" style={{ color: 'rgb(255,255,255)'}} />
        </Link>
        <Link to='/notifications'>
      <Icon className="Nav-bar" type="bell" style={{ color: 'rgb(255,255,255)'}} />
        </Link>
      <Link to='/settings'>
      <Icon className="Nav-bar" type="setting" style={{ color: 'rgb(255,255,255)'}} />
        </Link>
        </Col>
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
            <Menu.Item key="1" ><Link to="/login">Login</Link></Menu.Item>
            <Menu.Item key="2" ><Link to="/dashboard">Dashboard</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/community">Community</Link></Menu.Item>
            <Menu.Item key="4"><Link to="/explore">Explore</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/profile">Profile</Link></Menu.Item>
            <Menu.Item key="6"><Link to="/friends">Friends</Link></Menu.Item>
            <Menu.Item key="7"><Link to="/groups">Groups</Link></Menu.Item>
            <Menu.Item key="8"><Link to="/messages">Messages</Link></Menu.Item>
            <Menu.Item key="9"><Link to="/submissions">Submissions</Link></Menu.Item>
            <Menu.Item key="10"><Link to="/feedbackGiven">Feedback Given</Link></Menu.Item>
            <Menu.Item key="11"><Link to="/users">Users</Link></Menu.Item>
            <Menu.Item key="12"><Link to="/reports">Reports</Link></Menu.Item>


        
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
      <Route path='/settings' render = { () => (
        <Settings/>)} 
      />
      <Route path='/notifications' render = { () => (
        <Notifications/>)} 
      />
      <Route path='/dashboard' render = { () => (
        <Dashboard/>)} 
      />
      <Route path='/register' render = { () => (
        <Register/>)} 
      />
      <Route path='/users' render = { () => (
        <Users/>)} 
      />
      <Route path='/reports' render = { () => (
        <Reports/>)} 
      />
      <Route path='/resetPassword' render = { () => (
        <ResetPassword/>)} 
      />
    
    <Route path='/editProfile' render = { () => (
        <EditProfile/>)} 
      />

    <Route path='/createSubmission' render = { () => (
        <CreateSubmission/>)} 
    />

    <Route path='/EditSubmission' render = { () => (
        <EditSubmission/>)} 
    />
       
    </Switch>
        </Content>
      </Layout>
    </Layout>
  </Layout>
       
      
      </div>
    
      
    );
  }

  constructor(props){
    super(props)
    this.state = {
      users: [],
      store: []
    }
  }

  componentDidMount(){
    axios.get('http://localhost:5000/user/test')
    .then(json => console.log(json))
  }
}


export default App;
