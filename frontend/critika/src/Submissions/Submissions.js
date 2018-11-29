import React from 'react'
import './App.css'
import './Submissions.css'
import { Carousel, Menu, Dropdown, Icon, Button, Slider, notification, Row, Col} from 'antd'
import { Link } from 'react-router-dom'
import thumbnail from './default image.jpg'

class Submissions extends React.Component{
    
    
  render(){
    function onChange(a, b, c) {
        console.log(a, b, c);
      }

      const menu = (
        <Menu>
          <Menu.Item>
            <a>Most Recent</a>
          </Menu.Item>
          <Menu.Item>
            <a>Most Popular</a>
          </Menu.Item>
          <Menu.Item>
            <a>Top Rated</a>
          </Menu.Item>
        </Menu>
      );

      class IconSlider extends React.Component {
        state = {
          value: 0,
        }
      
        handleChange = (value) => {
          this.setState({ value });
        }
      
        render() {
          const { max, min } = this.props;
          const { value } = this.state;
          const mid = ((max - min) / 2).toFixed(5);
          const preColor = value >= mid ? '' : 'rgba(0, 0, 0, .45)';
          const nextColor = value >= mid ? 'rgba(0, 0, 0, .45)' : '';
          return (
            <div className="icon-wrapper">
              Beginner
              <Slider {...this.props} onChange={this.handleChange} value={value} />
              Professional
            </div>
          );
        }
      }

      const close = () => {
        console.log('Notification was closed. Either the close button was clicked or duration time elapsed.');
      };
      
      const openNotification = () => {
        const key = `open${Date.now()}`;
        const btn = (
          <Button type="primary" size="large" onClick={() => notification.close(key)}>
            Confirm
          </Button>
        );
        notification.open({
          message: 'Remove Submission',
          description: 'Are you sure you want to remove your submission',
          btn,
          key,
          onClose: close,
        });
      };
      
  return (
      
    <div>
      <Button type="primary"><Link to="/createSubmission"> + Add New Submission </Link></Button>
      <h1>Your submissions</h1>

      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          Submissions type <Icon type="down" />
        </a>
      </Dropdown>

      <Button type="primary" onClick={openNotification}>Remove Submission </Button>
      <Button type="primary"><Link to="/EditSubmission">Edit Submission</Link></Button>
      <p></p>

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

export default Submissions