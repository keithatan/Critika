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

describe('Test get all reported comments', function () {

    describe('Test without being an admin', function () {
        it('Should return 401', function (done) {
            User.findOneAndUpdate({ username: uname }, { $set: { status: 'reg-user' } }).then((user) => {
                var token = user['tokens'][0]['token'][0]

                User.findOne({ username: uname }, (err, user) => {
                    chai.request(server)
                        .get('/submission/all-reported')
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

    describe('Test with bad auth', function () {
        it('Should return 401', function (done) {
            User.findOneAndUpdate({ username: uname }, { $set: { status: 'admin' } }).then((user) => {
                var token = user['tokens'][0]['token'][0]

                User.findOne({ username: uname }, (err, user) => {
                    chai.request(server)
                        .get('/submission/all-reported')
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

    describe('Test with correct info', function () {
        it('Should return 200', function (done) {
            User.findOneAndUpdate({ username: uname }, { $set: { status: 'admin' } }).then((user) => {
                var token = user['tokens'][0]['token'][0]

                User.findOne({ username: uname }, (err, user) => {
                    chai.request(server)
                        .get('/submission/all-reported')
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