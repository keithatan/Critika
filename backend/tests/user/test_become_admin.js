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

describe('test become admin', function () {

    describe('test while user is not an admin', function (done) {
        it('should return 401', function (done) {
            User.findOneAndUpdate({ username: uname }, { $set: { status: 'reg-user' } }).then((user) => {
                
                var token = user['tokens'][0]['token'][0]

                User.findOne({ username: uname }, (err, user) => {
                    chai.request(server)
                        .post('/user/become-admin')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .set('token', token)
                        .send()
                        .end((err, res) => {
                            res.should.have.status(401)
                            done()
                        })
                });
            })
        })
    })

    describe('test with bad token', function (done) {
        it('should return 401', function (done) {
            User.findOneAndUpdate({ username: uname }, { $set: { status: 'admin' } }).then((user) => {
                
                var token = user['tokens'][0]['token'][0]

                User.findOne({ username: uname }, (err, user) => {
                    chai.request(server)
                        .post('/user/become-admin')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .set('token', 'bad token')
                        .send()
                        .end((err, res) => {
                            res.should.have.status(401)
                            done()
                        })
                });
            })
        })
    })

    describe('test with correct info', function (done) {
        it('should return 200', function (done) {
            User.findOneAndUpdate({ username: uname }, { $set: { status: 'admin' } }).then((user) => {
                
                var token = user['tokens'][0]['token'][0]

                User.findOne({ username: uname }, (err, user) => {
                    chai.request(server)
                        .post('/user/become-admin')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .set('token', token)
                        .send()
                        .end((err, res) => {
                            res.should.have.status(200)
                            done()
                        })
                });
            })
        })
    })

})