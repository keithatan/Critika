import React from 'react'
import './App.css'
import axios from 'axios'
import { Form, InputNumber, Col, Input, Button, Alert} from 'antd';
import { Link, Redirect } from 'react-router-dom'

const FormItem = Form.Item;

class VerifyEmail extends React.Component {

    state = {
        redirect: false,
        success: false,
        noMatch: false,
        exists: true
    }

    sendUserCode = async (email, usercode) => {
        try {
            return await axios.post('http://localhost:5000/user/verify-email', {
                email: email,
                verificationNum: usercode
            })
        } catch (err) {
            console.log(err.response.data.message)
            if (err.response.data.message == "Verification code does not match") {
                this.setState({ noMatch: true, exists: true })
            }
            else if (err.response.data.message == "Email does not exist in our records") {
                this.setState({ exists: false })
            }
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const response = await this.sendUserCode(values.email, values.usercode)
                if (response != undefined) {
                    this.setState({ success: true, noMatch: false })
                }
            }
            else {
                console.log(err)
            }
        });
    }

    validateCode = (rule, value, callback) => {
        if (value.toString().length != 4) {
            callback("Code length must be four.");
        }
        else {
            callback();
        }
    }

    handleClose = () => {
        this.setState({ redirect: true })
    }

    render() {

        const { getFieldDecorator } = this.props.form;
        const { redirect, success, noMatch, exists } = this.state;

        if (redirect && success) {
            return <Redirect to="/dashboard" />
        }

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <Col span={8} offset={8}>
                <Form style={{ width: "300px", textAlign: "center" }} onSubmit={this.handleSubmit} className="verifyemail-form">
                    <FormItem
                        {...formItemLayout}
                        label="Email"
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not a valid Email.',
                            }, {
                                required: true, message: 'Please input your Email.',
                            }],
                        })(
                            <Input placeholder="Email" type="text" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="4 Digit Code"
                    >
                        {getFieldDecorator('usercode', {
                            rules: [{ required: true, message: 'Code is required' },
                            {
                                validator: this.validateCode
                            }],
                        })(
                            <InputNumber size='large' />
                        )}
                    </FormItem>
                    <Button type="primary" htmlType="submit" className="verifyemail-form-button">
                        Verify Email
                    </Button>
                    {!exists ? (
                        <Alert message="Email does not exist in our records." type="error" banner="true" />
                    ) : noMatch ? (
                        <Alert message="The verification code does not match." type="error" banner="true" />
                    ) : success ? (
                        <Alert
                            message="Account Verified!"
                            description="Your account has been successfully verified! Close the alert to go to your dashboard."
                            type="success"
                            showIcon
                            banner
                            closable
                            afterClose={this.handleClose}
                        />
                    ) : (null)}
                </Form>
            </Col>
        );
    }
}

const VerifyEmailForm = Form.create()(VerifyEmail);

export default VerifyEmailForm