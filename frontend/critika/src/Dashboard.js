import React from 'react'
import './App.css'
import {Button, Icon, Carousel} from 'antd'
import {Link} from 'react-router-dom'
import thumbnail from './default image.jpg'


class Dashboard extends React.Component{
  render(){
    function onChange(a, b, c) {
      console.log(a, b, c);
    }
  return (
    <div>
        <Button.Group size={"small"}>
          <Button class="profilebtn" type="primary">
            <Icon type="left" />Return to Profile
          </Button>
      </Button.Group>
 
      <h1>Dashboard</h1>
      {/* <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Username" /> */}
      <div>Your Queue</div>
      <Carousel afterChange={onChange} style={{backgroundColor: 'rgb(194, 165, 211)'}}>
        <div>
          <Button style={{  height: '7em', borderRadius: '0.9em' }} type="flex" justify="center"><img style={{ height: '7em', borderRadius: '0.9em' }} src={thumbnail}/></Button>
        </div>
        <div>      
        <Button style={{  height: '7em', borderRadius: '0.9em' }} type="flex" justify="center"><img style={{ height: '7em', borderRadius: '0.9em' }} src={thumbnail}/></Button>
        </div>
        <div>      
        <Button style={{  height: '7em', borderRadius: '0.9em' }} type="flex" justify="center"><img style={{ height: '7em', borderRadius: '0.9em' }} src={thumbnail}/></Button>
        </div>
        <div>      
        <Button style={{  height: '7em', borderRadius: '0.9em' }} type="flex" justify="center"><img style={{ height: '7em', borderRadius: '0.9em' }} src={thumbnail}/></Button>
        </div>
      </Carousel>
      <div>Popular Submissions</div>
      <Carousel afterChange={onChange} style={{backgroundColor: 'rgb(194, 165, 211)'}}>
        <div>
          <Button style={{  height: '7em', borderRadius: '0.9em' }} type="flex" justify="center"><img style={{ height: '7em', borderRadius: '0.9em' }} src={thumbnail}/></Button>
        </div>
        <div>      
        <Button style={{  height: '7em', borderRadius: '0.9em' }} type="flex" justify="center"><img style={{ height: '7em', borderRadius: '0.9em' }} src={thumbnail}/></Button>
        </div>
        <div>      
        <Button style={{  height: '7em', borderRadius: '0.9em' }} type="flex" justify="center"><img style={{ height: '7em', borderRadius: '0.9em' }} src={thumbnail}/></Button>
        </div>
        <div>      
        <Button style={{  height: '7em', borderRadius: '0.9em' }} type="flex" justify="center"><img style={{ height: '7em', borderRadius: '0.9em' }} src={thumbnail}/></Button>
        </div>
      </Carousel>


     
    </div>
  );
  }
} 

export default Dashboard