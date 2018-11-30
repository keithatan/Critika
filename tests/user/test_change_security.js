var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var User = require('../../model/user');

chai.use(chaiHttp);

var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL

describe('test change security', function () {

    describe('Change security without security question', function (done) {
        it('should return 400', function (done) {
            var info = {
                securityquestionanswer: 'answer'
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 

                var token = user['tokens'][0]['token'][0]

                chai.request(server)
                    .post('/user/change-security')
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

    describe('Change security without security question answer', function (done) {
        it('should return 400', function (done) {
            var info = {
                securityquestion: 'question',
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 

                var token = user['tokens'][0]['token'][0]

                chai.request(server)
                    .post('/user/change-security')
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

    describe('Change security with bad auth', function (done) {
        it('should return 401', function (done) {
            var info = {
                securityquestion: 'question',
                securityquestionanswer: 'answer'
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 

                var token = user['tokens'][0]['token'][0]

                chai.request(server)
                    .post('/user/change-security')
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
        
    describe('Change security with correct info', function (done) {
        it('should return 200', function (done) {
            var info = {
                securityquestion: 'question',
                securityquestionanswer: 'answer'
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 

                var token = user['tokens'][0]['token'][0]

                chai.request(server)
                    .post('/user/change-security')
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