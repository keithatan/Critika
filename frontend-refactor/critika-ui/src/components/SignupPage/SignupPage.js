import React from 'react';
import SignupForm from '../SignupForm/SignupForm';
import {connect} from 'react-redux'
import {userRegisterRequest} from '../../actions/registerActions'
import PropTypes from 'prop-types';


class SignupPage extends React.Component{
    render(){
        const {userRegisterRequest} = this.props
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <SignupForm userRegisterRequest={userRegisterRequest}/>
                </div>
            </div>
        );
    }
}

SignupPage.proptypes = {
    userRegisterRequest: PropTypes.isRequired
}

export default connect(null, {userRegisterRequest} )(SignupPage);