var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var functions = require('../unitTestFunctions.js')
var User = require('../../model/user');

chai.use(chaiHttp);

var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL

describe('test ban user', function () {

    this.beforeAll(function(done) {
        
        User.findOneAndDelete({ username: 'banned' }).then((res) => {
            var regInfo = {
                username: 'banned',
                password: 'password please',
                email: 'mail@mail.com',
                securityquestion: 'ok',
                securityquestionanswer: 'ok',
            }

            chai.request(server)
                .post('/user/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(regInfo)
                .end((err, res) => {
                    done()
                })
        })
    })

    describe('test ban user without username to be banned', function (done) {
        it('should return 400', function (done) {
            var info = {
                username: uname,
                password: pword,
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 

                var token = user['tokens'][0]['token'][0]

                chai.request(server)
                    .post('/user/ban-user')
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

    describe('test ban user without being an admin', function (done) {
        it('should return 401', function (done) {
            var info = {
                username: uname,
                password: pword,
                usernameToBeBanned: 'banned',
            }
            User.findOneAndUpdate({ username: uname }, { $set: { status: 'reg-user' } }).then((user) => {
                var token = user['tokens'][0]['token'][0]

                User.findOne({ username: uname }, (err, user) => {
                    chai.request(server)
                        .post('/user/ban-user')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .set('token', token)
                        .send(info)
                        .end((err, res) => {
                            res.should.have.status(401)
                            done()
                        })
                });
            })
        })
    })

    describe('test ban user with bad token', function (done) {
        it('should return 401', function (done) {
            var info = {
                username: uname,
                password: pword,
                usernameToBeBanned: 'banned',
            }
            User.findOneAndUpdate({ username: uname }, { $set: { status: 'admin' } }).then((user) => {
                var token = user['tokens'][0]['token'][0]

                User.findOne({ username: uname }, (err, user) => {
                    chai.request(server)
                        .post('/user/ban-user')
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

    describe('test ban user with correct info', function (done) {
        it('should return 200', function (done) {

            var info = {
                username: uname,
                password: pword,
                usernameToBeBanned: 'banned',
            }
            User.findOneAndUpdate({ username: uname }, { $set: { status: 'admin' } }).then((user) => {
                var token = user['tokens'][0]['token'][0]

                User.findOne({ username: uname }, (err, user) => {
                    chai.request(server)
                        .post('/user/ban-user')
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