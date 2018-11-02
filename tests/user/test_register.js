var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var functions = require('../unitTestFunctions.js')
var request = require('request');
var expect = require('Chai').expect;
var User = require('../../model/user');

chai.use(chaiHttp);


var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL

describe('Register', () => {

    before(function(done){
        User.deleteOne({username: uname}, function(err){
            //console.log(err)
        })
        done();
    })

    describe('Register without any information', () => {
        it('Should return 400', (done) => {
            chai.request(server)
            .post('/user/register')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send()
            .end((err, res) => {
                res.should.have.status(400);
            done();
            });
        })
    })

    describe('Register without username', () => {
        it('Should return 400', (done) => {
            var info = {
                password: pword,
                email: mail,
                securityquestion: 'ok',
                securityquestionanswer: 'ok',
            }
            chai.request(server)
                .post('/user/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(info)
                .end((err, res) => {
                    res.should.have.status(400);
                done();
            });
        })
    })

    describe('Register without password', () => {
        it('Should return 400', (done) => {
            var info = {
                username: uname,
                email: mail,
                securityquestion: 'ok',
                securityquestionanswer: 'ok',
            }
            chai.request(server)
                .post('/user/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(info)
                .end((err, res) => {
                    res.should.have.status(400);
                done();
                });
        })
    })

    describe('Register without security question', () => {
        it('Should return 400', (done) => {
            var info = {
                username: uname,
                password: pword,
                email: mail,
                securityquestionanswer: 'ok',
            }
            chai.request(server)
                .post('/user/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(info)
                .end((err, res) => {
                    res.should.have.status(400);
                done();
            });
        })
    })

    describe('Register without security question answer', () => {
        it('Should return 400', (done) => {
            var info = {
                username: uname,
                password: pword,
                email: mail,
                securityquestion: 'ok',
            }
            chai.request(server)
                .post('/user/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(info)
                .end((err, res) => {
                    res.should.have.status(400);
                done();
            });
        })
    })

    describe('Register with username that is too short', () => {
        it('Should return 400', (done) => {
            var info = {
                username: 'short',
                password: pword,
                email: mail,
                securityquestion: 'ok',
                securityquestionanswer: 'ok',
            }
            chai.request(server)
                .post('/user/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(info)
                .end((err, res) => {
                    res.should.have.status(400);
                done();
            });
        })
    })

    describe('Register with password that is too short', () => {
        it('Should return 400', (done) => {
            var info = {
                username: uname,
                password: 'short',
                email: mail,
                securityquestion: 'ok',
                securityquestionanswer: 'ok',
            }
            chai.request(server)
                .post('/user/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(info)
                .end((err, res) => {
                    res.should.have.status(400);
                done();
            });
        })
    })

    describe('Register with invalid email', () => {
        it('Should return 400', (done) => {
            var info = {
                username: uname,
                password: pword,
                email: 'bad email',
                securityquestion: 'ok',
                securityquestionanswer: 'ok',
            }
            chai.request(server)
                .post('/user/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(info)
                .end((err, res) => {
                    res.should.have.status(400);
                done();
            });
        })
    })

    describe('Correct register', () => {
        it('Should return 200', (done) => {
            var info = {
                username: uname,
                password: pword,
                email: mail,
                securityquestion: 'ok',
                securityquestionanswer: 'ok',
            }
            chai.request(server)
                .post('/user/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(info)
                .end((err, res) => {
                   // console.log(res.body)
                    res.should.have.status(200);
                done();
            });
        });
    });
});