var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var User = require('../../model/user');
var Feedback = require('../../model/feedback')
var Category = require('../../model/category')


chai.use(chaiHttp);

var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL

describe('test get all feedback for a usre', function () {

    describe('Rate feedback without rating', function (done) {
        it('should return 400', function (done) {
            Submission.findOne({ submissionName: 'submission name' }).then((sub) => {
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
                    rating: 3,
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
            Submission.findOne({ submissionName: 'submission name' }).then((sub) => {
                var info = {
                    rating: 3,
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

    describe('Rate feedback with bath auth', function (done) {
        it('should return 401', function (done) {
            Submission.findOne({ submissionName: 'submission name' }).then((sub) => {
                var info = {
                    rating: 3,
                    submissionID: sub._id
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

    describe('Rate feedback with correct info', function (done) {
        it('should return 200', function (done) {
            Submission.findOne({ submissionName: 'submission name' }).then((sub) => {
                var info = {
                    rating: 3,
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
                            res.should.have.status(200)
                            done()
                        })
                });
            })
        })
    })

})