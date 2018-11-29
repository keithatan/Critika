import React from 'react'
import './App.css'
import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button, Menu, Dropdown, message  } from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;



class Test extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            name: ''
        }
    }

    onChange = e =>{
        const{id,value} = e.target;
    }

    clicked(){
        window.alert(this.state.name);
    }

  render(){
      const{
          name
      } = this.state;
  return (
    <div>
      <h1>Test</h1>
          <Input type="text" id="name" value={name} onChange={this.onChange} placeholder="test"></Input>
        <Button type="primary" name="name" id="name" value={this.state.name} onClick={this.clicked}>
            test2
        </Button>
    </div>
  );
  }
} 

export default Test