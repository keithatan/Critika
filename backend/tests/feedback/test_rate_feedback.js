var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var User = require('../../model/user');
var Feedback = require('../../model/feedback')
var Category = require('../../model/category')
var Submission = require('../../model/submission');


chai.use(chaiHttp);

var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL

describe('test get all feedback for a user', function () {

    this.beforeAll(function (done) {
        var tempUser = {
            username: 'tempUser',
            password: 'tempPassword',
            email: 'tempemail@email.com',
            securityquestion: 'temp Security Question',
            securityquestionanswer: 'temp Security Question Answer'
        }
        chai.request(server)
            .post('/user/register')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(tempUser)
            .end((err, res) => {

                var verifyInfo = {
                    verificationNum: res.header['verificationnum'],
                    email: 'tempemail@email.com',
                }

                chai.request(server)
                    .post('/user/verify-email')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send(verifyInfo)
                    .end((err, res) => {
                        var loginInfo = {
                            username: 'tempUser',
                            password: 'tempPassword',
                        }

                        chai.request(server)
                            .post('/user/login')
                            .set('content-type', 'application/x-www-form-urlencoded')
                            .send(loginInfo)
                            .end((err, res) => {
                                var info = {
                                    category: 'example category',
                                    submissionName: 'tempSub',
                                    submissionText: 'submission text',
                                    submissionLink: 'submission link',
                                    submissionSkillLevel: 'submission skill level',
                                    submissionDescription: 'submission description',
                                    
                                }
                                User.findOne({ username: 'tempUser' }, (err, user) => {
                                    //do the get request here 

                                    var tempToken = user['tokens'][0]['token'][0]

                                    chai.request(server)
                                        .post('/submission/add')
                                        .set('content-type', 'application/x-www-form-urlencoded')
                                        .set('token', tempToken)
                                        .send(info)
                                        .end((err, res) => {
                                            var info = {
                                                category: 'example category',
                                                submissionName: 'submission name critique',
                                                submissionText: 'submission text',
                                                submissionLink: 'submission link',
                                                submissionSkillLevel: 'submission skill level',
                                                submissionDescription: 'submission description',
                                            }
                                            User.findOne({ username: uname }, (err, user) => {
                                                //do the get request here 

                                                var token = user['tokens'][0]['token'][0]

                                                chai.request(server)
                                                    .post('/submission/add')
                                                    .set('content-type', 'application/x-www-form-urlencoded')
                                                    .set('token', token)
                                                    .send(info)
                                                    .end((err, res) => {

                                                        Submission.findOne({ submissionName: 'submission name critique' }).then((sub) => {
                                                            var info = {
                                                                feedbackGood: 'good feedback given',
                                                                feedbackBad: 'bad',
                                                                feedbackWork: 'work',
                                                                submissionID: sub._id.toString()
                                                            }
                                                            chai.request(server)
                                                                .post('/feedback/critique')
                                                                .set('content-type', 'application/x-www-form-urlencoded')
                                                                .set('token', tempToken)
                                                                .send(info)
                                                                .end((err, res) => {
                                                                    done()
                                                                    // console.log(res)
                                                                })
                                                        })
                                                    })
                                            })
                                        })
                                });
                            })
                    })
            })
    })

    this.afterAll(function (done) {
        User.deleteMany({ email: 'tempemail@email.com' }).then(() => {
            Submission.deleteMany({ username: 'tempUser' }).then(() => {
                Feedback.deleteMany({ username: 'tempUser' }).then(() => {
                    done()
                })
            })
        })
    })

    describe('Rate feedback without rating', function (done) {
        it('should return 400', function (done) {
            Submission.findOne({ username: 'tempUser' }).then((sub) => {
                var info = {
                    submissionID: sub._id
                }
                User.findOne({ username: uname }, (err, user) => {
                    //do the get request here 

                    var token = user['tokens'][0]['token'][0]

                    chai.request(server)
                        .post('/feedback/rate-feedback')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .set('token', token)
                        .send(info)
                        .end((err, res) => {
                            res.should.have.status(400)
                            done()
                        })
                });
            })
        })
    })

    describe('Rate feedback without submissionID', function (done) {
        it('should return 400', function (done) {
            Submission.findOne({ submissionName: 'submission name' }).then((sub) => {
                var info = {
                    feedbackRating: 3,
                }
                User.findOne({ username: uname }, (err, user) => {
                    //do the get request here 

                    var token = user['tokens'][0]['token'][0]

                    chai.request(server)
                        .post('/feedback/rate-feedback')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .set('token', token)
                        .send(info)
                        .end((err, res) => {
                            res.should.have.status(400)
                            done()
                        })
                });
            })
        })
    })

    describe('Rate feedback without being owner', function (done) {
        it('should return 400', function (done) {
            Submission.findOne({ username: 'tempUser' }).then((sub) => {
                var info = {
                    feedbackRating: 3,
                    submissionID: sub._id.toString()
                }
                User.findOne({ username: uname }, (err, user) => {
                    //do the get request here 

                    var token = user['tokens'][0]['token'][0]

                    chai.request(server)
                        .post('/feedback/rate-feedback')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .set('token', token)
                        .send(info)
                        .end((err, res) => {
                            res.should.have.status(400)
                            done()
                        })
                });
            })
        })
    })

    describe('Rate feedback with bath auth', function (done) {
        it('should return 401', function (done) {
            Submission.findOne({ submissionName: 'submission name critique' }).then((sub) => {
                Feedback.findOne({ feedbackGood: 'good feedback given' }).then((feed) => {
                    var info = {
                        feedbackRating: '3',
                        submissionID: sub._id.toString(),
                        feedbackID: feed._id.toString()
                    }
                    User.findOne({ username: uname }, (err, user) => {
                        //do the get request here 

                        var token = user['tokens'][0]['token'][0]

                        chai.request(server)
                            .post('/feedback/rate-feedback')
                            .set('content-type', 'application/x-www-form-urlencoded')
                            .set('token', 'bad token')
                            .send(info)
                            .end((err, res) => {
                                res.should.have.status(401)
                                done()
                            })
                    });
                })
            })
        })
    })

    describe('Rate feedback with correct info', function (done) {
        it('should return 200', function (done) {
            Submission.findOne({ submissionName: 'submission name critique' }).then((sub) => {
                Feedback.findOne({ feedbackGood: 'good feedback given' }).then((feed) => {
                    var info = {
                        feedbackRating: '3',
                        submissionID: sub._id.toString(),
                        feedbackID: feed._id.toString()
                    }
                    User.findOne({ username: uname }, (err, user) => {
                        //do the get request here 

                        var token = user['tokens'][0]['token'][0]

                        chai.request(server)
                            .post('/feedback/rate-feedback')
                            .set('content-type', 'application/x-www-form-urlencoded')
                            .set('token', token)
                            .send(info)
                            .end((err, res) => {
                                res.should.have.status(200)
                                done()
                            })
                    });
                })
            })
        })
    })

})
