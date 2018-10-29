import React from 'react'
import './App.css'
import axios from 'axios'
import { Form, Input, Tooltip, Icon, Select, Button, Alert } from 'antd';
import { Redirect } from 'react-router-dom'
const FormItem = Form.Item;
const Option = Select.Option;


class FileReport extends React.Component {

  state = {
    success: false,
    redirect: false,
    mongoError: false
  }

  sendReport = async (reportType, reportResponse, rationale) => {
    try {
      return await axios.post('http://localhost:5000/user/FileReport', {
        reporttype: reportType,
        reportresponse: reportResponse,
        rationale: rationale
      })
    } catch (err) {
      console.log(err.response.data)
      if (err.response.data.name == "MongoError") {
          this.setState({ mongoError: true })
        }
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const response = await this.sendReport(values.reportType, values.reportType, values.rationale)
        console.log(response)
        if (response != undefined) {
          this.setState({ success: true })
        }
      }
      else {
        console.log(err)
      }
    });
  }

 
  handleClose = () => {
    this.setState({ redirect: true });
  }

  render() {

    const { success, redirect, mongoError } = this.state;

    if (redirect) {
      return <Redirect to='/Reports' />
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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>


          <FormItem
            {...formItemLayout}
            label={(
              <span>
              Type of Report&nbsp;
              </span>
            )}
          >
            {getFieldDecorator('reportType', {
              rules: [{ required: true, message: 'Please choose what you would like to report.' }],
            })(
              <Select defaultValue="Feedback" style={{ width: 300 }}>
                <Option value="Feedback">Feedback</Option>
                <Option value="Comment">Comment</Option>
              </Select>
            )}
          </FormItem>



           <FormItem
            {...formItemLayout}
            label={(
              <span>
              Please choose the reason for your report.&nbsp;
              </span>
            )}
          >
            {getFieldDecorator('reportResponse', {
              rules: [{ required: true, message: 'Please choose the reason for your report.' }],
            })(
              <Select defaultValue="The feedback giver was being inappropriate." style={{ width: 500 }}>
                <Option value="The feedback giver was being inappropriate.">The feedback giver was being inappropriate.</Option>
                <Option value="The feedback given was inappropriate.">The feedback given was inappropriate.</Option>
                <Option value="The feedback was a spam.">The feedback was a spam.</Option>
                <Option value="The comment giver was being inappropriate.">The comment giver was being inappropriate.</Option>
                <Option value="The comment was inappropriate.">The comment was inappropriate.</Option>
                <Option value="The comment was a spam.">The comment was a spam.</Option>
              </Select>
            )}
          </FormItem>


          <FormItem
            {...formItemLayout}
            label={(
              <span>
                Explaination&nbsp;
                <Tooltip title="Rationale for report.">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
          >
            {getFieldDecorator('rationale', {
              rules: [{ required: true, message: 'Please further specify rationale for report' }],
            })(
              <Input placeholder="Rationale" type="text" />
            )}
          </FormItem>


          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Submit Report</Button>
          </FormItem>
          {success ? (
            <Alert
            message="Success!"
            description="Your report has been filed"
            type="success"
            showIcon
            banner
            closable
            afterClose={this.handleClose}
          /> ) : mongoError ? (
            <Alert message="An error existed" type="error" banner="true" />
          ) : (null)}
        </Form>
      </div>

    );
  }
}

const FileReportForm = Form.create()(FileReport);

export default FileReportForm