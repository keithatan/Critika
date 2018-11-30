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

describe('Test edit submissions', function () {

    describe('Test without submissionName', function () {

        it('should return 400', (done) => {
            var info = {
                submissionText: 'submission text'
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 

                var token = user['tokens'][0]['token'][0]
                // console.log(user)
                chai.request(server)
                    .post('/submission/edit')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .set('token', token)
                    .send(info)
                    .end((err, res) => {
                        // console.log(res)
                        res.should.have.status(400);
                        done()
                    })
            });
        })
    })

    describe('Test without submissionText', function () {
        it('should return 400', (done) => {
            var info = {
                submissionName: 'submission name',
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/submission/edit')
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
        it('should return 401', (done) => {
            var info = {
                submissionName: 'submission name',
                submissionText: 'submission text'
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/submission/edit')
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

        it('should return 200', (done) => {
            var info = {
                submissionName: 'submission name',
                submissionText: 'submission text'
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
                chai.request(server)
                    .post('/submission/edit')
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