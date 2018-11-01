import React, { Component } from 'react';
import {connect } from 'react-redux';
//import {login} from '.../actions';
import Navbar from '../Navbar/Navbar';

class Home extends Component {

  componentDidMount(){
    //this.props.login();
  }

  render() {
    return (

      <div className="container">
          <Navbar />
          {this.props.children}
      </div>
    );
  }
}

export default Home;