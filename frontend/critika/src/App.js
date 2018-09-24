import React, { Component } from 'react';
import logo from './logo.svg';
import Login from './Login';
import Profile from './Profile';
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
      <Switch>
      
        <Route path='/login' render = { () => (
        <Login/>)} />
         <Route path='/profile' render = { () => (
           <Profile/>)} />
         
      </Switch>
      </div>
    
      
    );
  }
}


export default App;
