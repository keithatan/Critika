import React from 'react'
import './App.css'
import { Button, Icon, Carousel, Modal, Form, Menu, Input, List, message, Spin, Avatar, Card } from 'antd'
import { Link } from 'react-router-dom'
import thumbnail from './default image.jpg'
import TextArea from 'antd/lib/input/TextArea';
import reqwest from 'reqwest';
import InfiniteScroll from 'react-infinite-scroller';
import { userInfo } from 'os';

const FormItem = Form.Item;
const { Meta } = Card;

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';


class Dashboard extends React.Component {
  state = {
    visible: false,
    data: [],
    loading: false,
    hasMore: true,
  }

  getData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
  }

  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.getData((res) => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
  }

  componentDidMount() {
    this.getData((res) => {
      this.setState({
        data: res.results,
      });
    });
  }

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


  render() {
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
        <Carousel afterChange={onChange} style={{ backgroundColor: 'rgb(194, 165, 211)' }}>
          <div style={{ height: '10px' }}>
            <div style={{ margin: '10px', display: 'block' }}>
              <Button style={{ height: '12em', borderRadius: '0.9em', paddingTop: '5px' }} type="flex" justify="center">
                <img style={{ height: '7em', borderRadius: '0.9em' }} src={thumbnail} />
              </Button>


              <Button style={{ margin: '5px' }} justify="center" onClick={this.showModal}> Critique </Button>
              <Modal
                title="Critique a Submission"
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
                <h2 style={{textAlign:'center'}}> Submission Title </h2>
                <Card
                  style={{ width: 'max', position:'center' }}
                  cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                >
                  <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="username"
                    description="This is the description"
                  />
                </Card>
                <FormItem>

                  <p style={{ height: '20px', marginTop:'20px' }}>Feedback</p>
                  <div>

                    <TextArea rows={4} placeholder="Please enter your feedback"></TextArea>

                  </div>

                  <p style={{ height: '20px', marginTop: '20px' }}>Comments</p>
                  <div style={{ background: 'rgba(194,165,211,.4)' }}>
                    <div className="demo-infinite-container" style={{ padding: '10px' }}>
                      <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={this.handleInfiniteOnLoad}
                        hasMore={!this.state.loading && this.state.hasMore}
                        useWindow={false}
                      >
                        <List
                          dataSource={this.state.data}
                          renderItem={item => (
                            <List.Item key={item.id}>
                              <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={<a href="https://ant.design">{item.name.last}</a>}
                                description="comment"
                              />
                            </List.Item>
                          )}
                        >
                          {this.state.loading && this.state.hasMore && (
                            <div className="demo-loading-container">
                              <Spin />
                            </div>
                          )}

                          <List.Item>
                            <List.Item.Meta
                              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                              title={<a href="https://ant.design">User</a>}
                              description={<TextArea rows={4} placeholder="Please enter your comment"></TextArea>}
                            />
                          </List.Item>
                        </List>

                      </InfiniteScroll>
                    </div>
                    <div>
                    </div>
                  </div>
                </FormItem>
              </Modal>
            </div>
          </div>

          <div style={{ height: '10px' }}>
            <div style={{ margin: '10px', display: 'block' }}>
              <Button style={{ height: '12em', borderRadius: '0.9em', paddingTop: '5px' }} type="flex" justify="center">
                <img style={{ height: '7em', borderRadius: '0.9em' }} src={thumbnail} />
              </Button>
              <Button style={{ margin: '5px' }} justify="center"> Critique </Button>
            </div>
          </div>

          <div style={{ height: '10px' }}>
            <div style={{ margin: '10px', display: 'block' }}>
              <Button style={{ height: '12em', borderRadius: '0.9em', paddingTop: '5px' }} type="flex" justify="center">
                <img style={{ height: '7em', borderRadius: '0.9em' }} src={thumbnail} />
              </Button>
              <Button style={{ margin: '5px' }} justify="center"> Critique </Button>
            </div>
          </div>

          <div style={{ height: '10px' }}>
            <div style={{ margin: '10px', display: 'block' }}>
              <Button style={{ height: '12em', borderRadius: '0.9em', paddingTop: '5px' }} type="flex" justify="center">
                <img style={{ height: '7em', borderRadius: '0.9em' }} src={thumbnail} />
              </Button>
              <Button style={{ margin: '5px' }} justify="center"> Critique </Button>
            </div>
          </div>
        </Carousel>
        <div>Popular Submissions</div>
        <Carousel afterChange={onChange} style={{ backgroundColor: 'rgb(194, 165, 211)' }}>
          <div style={{ height: '10px' }}>
            <div style={{ margin: '10px', display: 'block' }}>
              <Button style={{ height: '12em', borderRadius: '0.9em', paddingTop: '5px' }} type="flex" justify="center">
                <img style={{ height: '7em', borderRadius: '0.9em' }} src={thumbnail} />
              </Button>
              <Button style={{ margin: '5px' }} justify="center"> Critique </Button>
            </div>
          </div>

          <div style={{ height: '10px' }}>
            <div style={{ margin: '10px', display: 'block' }}>
              <Button style={{ height: '12em', borderRadius: '0.9em', paddingTop: '5px' }} type="flex" justify="center">
                <img style={{ height: '7em', borderRadius: '0.9em' }} src={thumbnail} />
              </Button>
              <Button style={{ margin: '5px' }} justify="center"> Critique </Button>
            </div>
          </div>

          <div style={{ height: '10px' }}>
            <div style={{ margin: '10px', display: 'block' }}>
              <Button style={{ height: '12em', borderRadius: '0.9em', paddingTop: '5px' }} type="flex" justify="center">
                <img style={{ height: '7em', borderRadius: '0.9em' }} src={thumbnail} />
              </Button>
              <Button style={{ margin: '5px' }} justify="center"> Critique </Button>
            </div>
          </div>

          <div style={{ height: '10px' }}>
            <div style={{ margin: '10px', display: 'block' }}>
              <Button style={{ height: '12em', borderRadius: '0.9em', paddingTop: '5px' }} type="flex" justify="center">
                <img style={{ height: '7em', borderRadius: '0.9em' }} src={thumbnail} />
              </Button>
              <Button style={{ margin: '5px' }} justify="center"> Critique </Button>
            </div>
          </div>
        </Carousel>



      </div>
    );
  }
}

export default Dashboard