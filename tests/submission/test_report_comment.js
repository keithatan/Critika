var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var User = require('../../model/user');
var Category = require('../../model/category')
var Submission = require('../../model/submission')

chai.use(chaiHttp);

var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL

describe('Test report comment', function () {

    this.beforeAll(function() {
        var info = {
            submissionName: 'submission name',
            comment: 'comment to be reported'
        }
        User.findOne({ username: uname }, (err, user) => {
            //do the get request here 

            var token = user['tokens'][0]['token'][0]

            chai.request(server)
                .post('/submission/add-comment')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set('token', token)
                .send(info)
                .end((err, res) => {})
        });
    })

    describe('Test without comment', function () {
        it('Should return 400', function (done) {
            var info = {
                submissionName: 'submission name',
                reportedMessage: 'for testing',
                reportedReason: 'it was necessary'
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/submission/report-comment')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .set('token', token)
                    .send(info)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done()
                    })
            });
        })
        
    })

    describe('Test without submission name', function () {
        it('Should return 400', function (done) {
            var info = {
                comment: 'comment to be reported',
                reportedMessage: 'for testing',
                reportedReason: 'it was necessary'
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/submission/report-comment')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .set('token', token)
                    .send(info)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done()
                    })
            });
        })
    })

    describe('Test without reported message', function () {
        it('Should return 400', function (done) {
            var info = {
                comment: 'comment to be reported',
                submissionName: 'submission name',
                reportedReason: 'it was necessary'
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/submission/report-comment')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .set('token', token)
                    .send(info)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done()
                    })
            });
        })
    })

    describe('Test without reported reason', function () {
        it('Should return 400', function (done) {
            var info = {
                comment: 'comment to be reported',
                submissionName: 'submission name',
                reportedMessage: 'for testing',
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/submission/report-comment')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .set('token', token)
                    .send(info)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done()
                    })
            });
        })
    })

    describe('Test with bad auth', function () {
        it('Should return 401', function (done) {
            var info = {
                comment: 'comment to be reported',
                submissionName: 'submission name',
                reportedMessage: 'for testing',
                reportedReason: 'it was necessary'
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/submission/report-comment')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .set('token', 'bad token')
                    .send(info)
                    .end((err, res) => {
                        res.should.have.status(401);
                        done()
                    })
            });
        })
    })

    describe('Test with correct info', function () {
        it('Should return 200', function (done) {
            var info = {
                comment: 'comment to be reported',
                submissionName: 'submission name',
                reportedMessage: 'for testing',
                reportedReason: 'it was necessary'
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/submission/report-comment')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .set('token', token)
                    .send(info)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done()
                    })
            });
        })
    })
})