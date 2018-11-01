import React from 'react';
import LoginForm from '../LoginForm/LoginForm'
import {login} from '../../actions/loginActions'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { TextField, validator } from 'react-textfield';

class LoginPage extends React.Component{
    render(){
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <LoginForm />
                </div>
            </div>
        );
    }
}

export default LoginPage;