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
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { Link, Switch, Route, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div Button>
          <Link to="/login">Login</Link>
        </div>
        <div Button>
          <Link to="/profile">Profile</Link>
        </div>
        <div Button>
          <Link to="/groups">Groups</Link>
        </div>
        <div Button>
          <Link to="/submissions">Submissions</Link>
        </div>
        <div Button>
          <Link to="/feedbackGiven">Feedback Given</Link>
        </div>
        <div Button>
          <Link to="/messages">Messages</Link>
        </div>
        <div Button>
          <Link to="/friends">Friends</Link>
        </div>
        <div Button>
          <Link to="/community">Community</Link>
        </div>
        <div Button>
          <Link to="/explore">Explore</Link>
        </div>
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
      </div>
    
      
    );
  }
}


export default App;
