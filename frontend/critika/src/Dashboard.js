import React from 'react'
import './App.css'
import {Button, Icon, Carousel,Modal, Form, Input} from 'antd'
import {Link} from 'react-router-dom'
import thumbnail from './default image.jpg'
const FormItem = Form.Item;


class Dashboard extends React.Component{
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render(){
    function onChange(a, b, c) {
      console.log(a, b, c);
    }
  return (
    <div>
        <Button.Group size={"small"}>
          <Button class="profilebtn" type="default">
          <Icon type="left" theme="outlined" /> 
          <Link to="/Profile">Return to Profile Page</Link>
          </Button>
      </Button.Group>
 
      <h1>Dashboard</h1>
      {/* <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)'}} />} placeholder="Username" /> */}
      <div>Your Queue</div>
      <Carousel afterChange={onChange} style={{backgroundColor: 'rgb(194, 165, 211)'}}>
        <div style={{height: '10px'}}> 
          <div style={{margin:'10px', display: 'block' }}>
            <Button style={{  height: '12em', borderRadius: '0.9em', paddingTop:'5px'}} type="flex" justify="center">
                <img style={{ height: '7em', borderRadius: '0.9em'}} src={thumbnail}/>
            </Button>


            
            <Button style={{margin: '5px'}}justify="center" onClick={this.showModal}> Critique </Button>
            <Modal
               title="Ciritque a Submission"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                  <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
                  <Button key="submit" type="primary" onClick={this.handleOk}>
                    Submit
                  </Button>
                ]}   
            >
                 <FormItem>
                      <Input placeholder="Username" type="text" />
                 </FormItem>
             </Modal>
          </div>
        </div>

        <div style={{height: '10px'}}> 
          <div style={{margin:'10px', display: 'block' }}>
            <Button style={{  height: '12em', borderRadius: '0.9em', paddingTop:'5px'}} type="flex" justify="center">
                <img style={{ height: '7em', borderRadius: '0.9em'}} src={thumbnail}/>
            </Button>
            <Button style={{margin: '5px'}}justify="center"> Critique </Button>
          </div>
        </div>

        <div style={{height: '10px'}}> 
          <div style={{margin:'10px', display: 'block' }}>
            <Button style={{  height: '12em', borderRadius: '0.9em', paddingTop:'5px'}} type="flex" justify="center">
                <img style={{ height: '7em', borderRadius: '0.9em'}} src={thumbnail}/>
            </Button>
            <Button style={{margin: '5px'}}justify="center"> Critique </Button>
          </div>
        </div>

        <div style={{height: '10px'}}> 
          <div style={{margin:'10px', display: 'block' }}>
            <Button style={{  height: '12em', borderRadius: '0.9em', paddingTop:'5px'}} type="flex" justify="center">
                <img style={{ height: '7em', borderRadius: '0.9em'}} src={thumbnail}/>
            </Button>
            <Button style={{margin: '5px'}}justify="center"> Critique </Button>
          </div>
        </div>
      </Carousel>
      <div>Popular Submissions</div>
      <Carousel afterChange={onChange} style={{backgroundColor: 'rgb(194, 165, 211)'}}>
      <div style={{height: '10px'}}> 
          <div style={{margin:'10px', display: 'block' }}>
            <Button style={{  height: '12em', borderRadius: '0.9em', paddingTop:'5px'}} type="flex" justify="center">
                <img style={{ height: '7em', borderRadius: '0.9em'}} src={thumbnail}/>
            </Button>
            <Button style={{margin: '5px'}}justify="center"> Critique </Button>
          </div>
        </div>

        <div style={{height: '10px'}}> 
          <div style={{margin:'10px', display: 'block' }}>
            <Button style={{  height: '12em', borderRadius: '0.9em', paddingTop:'5px'}} type="flex" justify="center">
                <img style={{ height: '7em', borderRadius: '0.9em'}} src={thumbnail}/>
            </Button>
            <Button style={{margin: '5px'}}justify="center"> Critique </Button>
          </div>
        </div>

        <div style={{height: '10px'}}> 
          <div style={{margin:'10px', display: 'block' }}>
            <Button style={{  height: '12em', borderRadius: '0.9em', paddingTop:'5px'}} type="flex" justify="center">
                <img style={{ height: '7em', borderRadius: '0.9em'}} src={thumbnail}/>
            </Button>
            <Button style={{margin: '5px'}}justify="center"> Critique </Button>
          </div>
        </div>

        <div style={{height: '10px'}}> 
          <div style={{margin:'10px', display: 'block' }}>
            <Button style={{  height: '12em', borderRadius: '0.9em', paddingTop:'5px'}} type="flex" justify="center">
                <img style={{ height: '7em', borderRadius: '0.9em'}} src={thumbnail}/>
            </Button>
            <Button style={{margin: '5px'}}justify="center"> Critique </Button>
          </div>
        </div>
      </Carousel>


     
    </div>
  );
  }
} 

export default Dashboard