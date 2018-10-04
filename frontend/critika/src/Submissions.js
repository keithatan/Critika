import React from 'react'
import './App.css'
import './Submissions.css'
import { Carousel, Menu, Dropdown, Icon, Button, Slider} from 'antd'
import { Link } from 'react-router-dom'

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
      
  return (
      
    <div>
      <Button type="primary"><Link to="/createSubmission"> + Add New Submission </Link></Button>
      <h1>Your submissions</h1>

      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          Submissions type <Icon type="down" />
        </a>
      </Dropdown>

      <Button type="primary">Remove Submission</Button>
      <Button type="primary"><Link to="/EditSubmission">Edit Submission</Link></Button>

      <Carousel afterChange={onChange} style={{backgroundColor: 'rgb(194, 165, 211)'}}>
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