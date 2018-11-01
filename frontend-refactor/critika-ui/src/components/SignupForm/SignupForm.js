import React from 'react';
import PropTypes from 'prop-types';



class SignupForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            email:'',
            password:'',
            securityquestion:'',
            securityanswer:'',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
        this.props.userRegisterRequest(this.state)
        console.log(this.state)
    }

    render(){
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join us please</h1>
                <div className="form-group">
                    <label className="control-label">Username</label>
                    <input 
                        value={this.state.username}
                        onChange={this.onChange}
                        type="text"
                        name="username"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Email</label>
                    <input 
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        name="email"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input 
                        value={this.state.password}
                        onChange={this.onChange}
                        type="text"
                        name="password"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Security Question</label>
                    <input 
                        value={this.state.securityquestion}
                        onChange={this.onChange}
                        type="text"
                        name="securityquestion"
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Security Answer</label>
                    <input 
                        value={this.state.securityanswer}
                        onChange={this.onChange}
                        type="text"
                        name="securityanswer"
                        className="form-control"
                    />
                </div>

                <div className="form-group"> 
                    <button className="btn btn-primary btn-lg">
                    SignUp

                    </button>
                </div>
            </form>
        );
    }
}

SignupForm.proptypes = {
    userRegisterRequest: PropTypes.isRequired
}

export default SignupForm;