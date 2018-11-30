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

describe('Test add submissions', function () {

    this.beforeAll(function() {
        var info = {
            categoryName: 'example category',
            categoryDescription: 'example description'
        }

        User.findOne({ username: uname }, (err, user) => {
            //do the get request here 

            var token = user['tokens'][0]['token'][0]

            chai.request(server)
                .post('/category/create-category')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set('token', token)
                .send(info)
                .end((err, res)=> {})
        });
    })

    describe('Test without category', function () {
        it('Should return 400', function (done) {
            var info = {
                submissionName: 'submission name',
                submissionText: 'submission text',
                submissionLink: 'submission link',
                submissionSkillLevel: 'submission skill level',
                submissionDescription: 'submission description',
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/submission/add')
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

    describe('Test without submission link', function () {
        it('Should return 400', function (done) {
            var info = {
                category: 'example category',
                submissionName: 'submission name',
                submissionText: 'submission text',
                submissionSkillLevel: 'submission skill level',
                submissionDescription: 'submission description',
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/submission/add')
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

    describe('Test without submission skill level', function () {
        it('Should return 400', function (done) {
            var info = {
                category: 'example category',
                submissionName: 'submission name',
                submissionText: 'submission text',
                submissionLink: 'submission link',
                submissionDescription: 'submission description',
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/submission/add')
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
                category: 'example category',
                submissionText: 'submission text',
                submissionLink: 'submission link',
                submissionSkillLevel: 'submission skill level',
                submissionDescription: 'submission description',
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/submission/add')
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

    describe('Test without submission text', function () {
        it('Should return 400', function (done) {
            var info = {
                category: 'example category',
                submissionName: 'submission name',
                submissionLink: 'submission link',
                submissionSkillLevel: 'submission skill level',
                submissionDescription: 'submission description',
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/submission/add')
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

    describe('Test without submission description', function () {
        it('Should return 400', function (done) {
            var info = {
                category: 'example category',
                submissionName: 'submission name',
                submissionLink: 'submission link',
                submissionSkillLevel: 'submission skill level',
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/submission/add')
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

    describe('Test with invalid category', function () {
        it('Should return 400', function (done) {
            var info = {
                category: 'invalid category',
                submissionName: 'submission name',
                submissionText: 'submission text',
                submissionLink: 'submission link',
                submissionSkillLevel: 'submission skill level',
                submissionDescription: 'submission description',
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/submission/add')
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

    describe('Test with invalid token', function () {
        it('Should return 401', function (done) {
            var info = {
                category: 'example category',
                submissionName: 'submission name',
                submissionText: 'submission text',
                submissionLink: 'submission link',
                submissionSkillLevel: 'submission skill level',
                submissionDescription: 'submission description',
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/submission/add')
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
                category: 'example category',
                submissionName: 'submission name',
                submissionText: 'submission text',
                submissionLink: 'submission link',
                submissionSkillLevel: 'submission skill level',
                submissionDescription: 'submission description',
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/submission/add')
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