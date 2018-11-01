import React from 'react'
import {login} from '../../actions/loginActions'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { TextField } from 'react-textfield';



class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userlogin:'',
            password:''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e){
        e.preventDefault();
        this.props.login(this.state).then(
            //(response) => this.context.router.push('/');
        );
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render(){
        const {userlogin, password} = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Login</h1>
                <input 
                        value={this.state.userlogin}
                        onChange={this.onChange}
                        type="text"
                        name="userlogin"
                        className="form-control"
                />

                <input 
                        value={this.state.password}
                        onChange={this.onChange}
                        type="text"
                        name="password"
                        className="form-control"
                />

                <div className="form-group"> 
                    <button className="btn btn-primary btn-lg">
                    SignUp

                    </button>
                </div>


            </form>
            
        );
    }
}

LoginForm.proptypes = {
    login: PropTypes.isRequired
}

LoginForm.contexttypes= {
    router: PropTypes.object.isRequired
}

export default connect(null, {login} )(LoginForm)