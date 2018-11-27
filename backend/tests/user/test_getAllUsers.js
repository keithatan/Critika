var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();

var Submission = require('../../model/submission');
var User = require('../../model/user');
var category = require('../../model/category')

var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL

chai.use(chaiHttp);

describe('Test GET allUsers', () => {

    describe('User is not an admin', () => {
        it('Should return 400', function (done) {
            var info = {
                username: uname,
                password: pword,
            }

            User.findOne({ username: uname }, (err, user) => {

                var token = user['tokens'][0]['token'][0]

                chai.request(server)
                    .get('/user/all-users')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .set('token', token)
                    .send(info)
                    .end((err, res) => {
                        res.should.have.status(401)
                        done()

                    })
            })
        })
    })

    describe('User has bad auth', () => {

        it('Should return 401', function (done) {
            
            var info = {
                username: uname,
                password: pword,
            }

            User.findOneAndUpdate({ username: uname }, { $set: { status: 'admin' } }).then((user) => {
                var token = user['tokens'][0]['token'][0]

                User.findOne({ username: uname }, (err, user) => {
                    chai.request(server)
                        .get('/user/all-users')
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

    describe('Correct info', () => {
        it('Should return 200', function (done) {
            var info = {
                username: uname,
                password: pword,
            }

            User.findOneAndUpdate({ username: uname }, { $set: { status: 'admin' } }).then((user) => {
                var token = user['tokens'][0]['token'][0]

                User.findOne({ username: uname }, (err, user) => {
                    chai.request(server)
                        .get('/user/all-users')
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