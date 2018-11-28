var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var request = require('request');
var expect = require('Chai').expect;

chai.use(chaiHttp);


var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL

describe('Login', () => {

    describe('login without username or password', () => {
        it('Should return 400', (done) => {
            chai.request(server)
                .post('/user/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send()
                .end((err, res) => {
                    res.should.have.status(400);
                done();
            });
        })
    })

    describe('login without username', () => {
        it('Should return 400', (done) => {
            var info = {
                password: pword,
            }
            chai.request(server)
                .post('/user/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(info)
                .end((err, res) => {
                    res.should.have.status(400);
                done();
            });
        })
    })

    describe('login without password', () => {
        it('Should return 400', (done) => {
            var info = {
                username: uname,
            }
            chai.request(server)
                .post('/user/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(info)
                .end((err, res) => {
                    res.should.have.status(400);
                done();
            });
        })
    })

    describe('login with invalid username', () => {
        it('Should return 400', (done) => {
            var info = {
                username: 'invalid',
                password: pword,
            }
            chai.request(server)
                .post('/user/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(info)
                .end((err, res) => {
                    res.should.have.status(401);
                done();
            });
        })
    })

    describe('login with invalid password', () => {
        it('Should return 400', (done) => {
            var info = {
                username: uname,
                password: '1',
            }
            chai.request(server)
                .post('/user/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(info)
                .end((err, res) => {
                    res.should.have.status(401);
                done();
            });
        })
    })

    describe('Correct login', () => {
        it('Should return 200', (done) => {
            var info = {
                username: uname,
                password: pword,
            }
            chai.request(server)
                .post('/user/login')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(info)
                .end((err, res) => {
                    res.should.have.status(200);
                done();
            });
        });
    });
});

