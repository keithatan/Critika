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

describe('test edit info', function() {

    describe('Edit info without email', function(done) {
        it('should return 400', function(done) {
            var info = {
                username: uname,
                password: pword,
                securityquestion: 'ok',
                securityquestionanswer: 'ok'
            }
        
            User.findOne({username: uname}, (err, user) => {
            chai.request(server)
            .post('/user/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(info)
            .end((err, res) => {
                //do the get request here 
                chai.request(server)
                .get('/user/edit-info')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set('token', res.header['token'])
                .end((err, res) => {
                    res.should.have.status(400)
                })
                })
            });
            done()
        })
    })

    describe('Edit info without security question', function(done) {
        it('should return 400', function(done) {
            var info = {
                username: uname,
                password: pword,
                email: mail,
                securityquestionanswer: 'ok'
            }
        
            User.findOne({username: uname}, (err, user) => {
            chai.request(server)
            .post('/user/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(info)
            .end((err, res) => {
                //do the get request here 
                chai.request(server)
                .get('/user/edit-info')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set('token', res.header['token'])
                .end((err, res) => {
                    res.should.have.status(400)
                })
                })
            });
            done()
        })
    })

    describe('Edit info without email', function(done) {
        it('should return 400', function(done) {
            var info = {
                username: uname,
                password: pword,
                securityquestion: 'ok',
                securityquestionanswer: 'ok'
            }
        
            User.findOne({username: uname}, (err, user) => {
            chai.request(server)
            .post('/user/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(info)
            .end((err, res) => {
                //do the get request here 
                chai.request(server)
                .get('/user/edit-info')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set('token', res.header['token'])
                .end((err, res) => {
                    res.should.have.status(400)
                })
                })
            });
            done()
        })
    })

    describe('Edit info with bad auth token', function(done) {
        it('should return 400', function(done) {
            var info = {
                username: uname,
                password: pword,
                email: mail,
                securityquestion: 'ok',
                securityquestionanswer: 'ok'
            }
        
            User.findOne({username: uname}, (err, user) => {
            chai.request(server)
            .post('/user/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(info)
            .end((err, res) => {
                //do the get request here 
                chai.request(server)
                .get('/user/edit-info')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set('token', 'bad token')
                .end((err, res) => {
                    res.should.have.status(400)
                })
                })
            });
            done()
        })
    })

    describe('Edit info without email', function(done) {
        it('should return 200', function(done) {
            var info = {
                username: uname,
                password: pword,
                email: mail,
                securityquestion: 'ok',
                securityquestionanswer: 'ok'
            }
        
            User.findOne({username: uname}, (err, user) => {
            chai.request(server)
            .post('/user/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(info)
            .end((err, res) => {
                //do the get request here 
                chai.request(server)
                .get('/user/edit-info')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set('token', res.header['token'])
                .end((err, res) => {
                    res.should.have.status(200)
                })
                })
            });
            done()
        })
    })

})
