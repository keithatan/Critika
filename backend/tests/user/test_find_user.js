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

describe('test ban user', function () {

    describe('test find user with correct info', function (done) {
        it('should return 200', function (done) {

            var info = {
                username: uname,
            }

            User.findOne({ username: uname }, (err, user) => {

                var token = user['tokens'][0]['token'][0]

                chai.request(server)
                    .post('/user/find')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .set('token', token)
                    .send(info)
                    .end((err, res) => {
                        res.should.have.status(200)
                        done()
                    })
            })
        })
    })
})