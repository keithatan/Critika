import React from 'react'
import './App.css'
import './Submissions.css'
import { Carousel } from 'antd'

class Submissions extends React.Component{
    
    
  render(){
    function onChange(a, b, c) {
        console.log(a, b, c);
      }
  return (
      
    <div>
      <h1>Your submissions</h1>
      <Carousel afterChange={onChange}>
    <div><h3>1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
  </Carousel>
    </div>
  );
  }
} 

export default Submissions