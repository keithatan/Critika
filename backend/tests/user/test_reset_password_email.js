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

describe('test reset password email', function () {

    this.afterAll(function (){
        var info = {
            password: pword,
        }

        User.findOne({ username: uname }, (err, user) => {
            //do the get request here 

            var token = user['tokens'][0]['token'][0]

            chai.request(server)
                .post('/user/change-password')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set('token', token)
                .send(info)
                .end((err, res) => {
                    done()
                })
        });
    })

    describe('reset password email without email', function (done) {
        it('should return 400', function (done) {
            var info = {
                security_question: 'ok',
                security_question_answer: 'ok',
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 

                var token = user['tokens'][0]['token'][0]

                chai.request(server)
                    .post('/user/reset-password-email')
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

    describe('reset password email without security question', function (done) {
        it('should return 400', function (done) {
            var info = {
                email: mail,
                security_question_answer: 'ok',
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 

                var token = user['tokens'][0]['token'][0]

                chai.request(server)
                    .post('/user/reset-password-email')
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

    describe('reset password email without security question answer', function (done) {
        it('should return 400', function (done) {
            var info = {
                email: mail,
                security_question: 'ok',
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 

                var token = user['tokens'][0]['token'][0]

                chai.request(server)
                    .post('/user/reset-password-email')
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

    describe('reset password email with invalid email', function (done) {
        it('should return 400', function (done) {
            var info = {
                email: 'invalid mail',
                security_question: 'ok',
                security_question_answer: 'ok',
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 

                var token = user['tokens'][0]['token'][0]

                chai.request(server)
                    .post('/user/reset-password-email')
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

    describe('reset password email with invalid security question', function (done) {
        it('should return 400', function (done) {
            var info = {
                email: mail,
                security_question: 'invalid question',
                security_question_answer: 'ok',
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 

                var token = user['tokens'][0]['token'][0]

                chai.request(server)
                    .post('/user/reset-password-email')
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

    describe('reset password email with invalid security question answer', function (done) {
        it('should return 400', function (done) {
            var info = {
                email: mail,
                security_question: 'ok',
                security_question_answer: 'invalid answer',
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 

                var token = user['tokens'][0]['token'][0]

                chai.request(server)
                    .post('/user/reset-password-email')
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

    describe('reset password with correct info', function (done) {
        it('should return 200', function (done) {
            var info = {
                email: mail,
                security_question: 'ok',
                security_question_answer: 'ok',
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 

                var token = user['tokens'][0]['token'][0]

                chai.request(server)
                    .post('/user/reset-password-email')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .set('token', token)
                    .send(info)
                    .end((err, res) => {
                        // console.log(res)
                        res.should.have.status(200)
                        done()
                    })
            });
        })
    })

})