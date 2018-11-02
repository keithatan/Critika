var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var functions = require('../unitTestFunctions.js')

chai.use(chaiHttp);

describe('Verify Email', () => {

    var headers = {
        verificationNum: 0,
        dummy: 'dummy',
    }

    before(function (){
        
    })

    describe('Verify email without any info', function(done) {
        it('Should return 400', (done) => {
            chai.request(server)
            .post('/user/verify-email')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send()
            .end((err, res) => {
                res.should.have.status(400);
            done();
            });
        })
    })

    describe('Verify email without verification num', function(done) {
        var info = {
            username: uname,
            email: mail,
        }
        chai.request(server)
            .post('/user/verify-email')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(info)
            .end((err, res) => {
                res.should.have.status(400);
            done();
        });
    })

    describe('Verify email without email', function(done) {
        var info = {
            username: uname,
            verificationnum: 'WAIT',
        }
        chai.request(server)
            .post('/user/verify-email')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(info)
            .end((err, res) => {
                res.should.have.status(400);
            done();
        });
    })

    describe('Verify email without username', function(done) {
        var info = {
            email: mail,
            verificationnum: 'WAIT',
        }
        chai.request(server)
            .post('/user/verify-email')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(info)
            .end((err, res) => {
                res.should.have.status(400);
            done();
        });
    })

    describe('Verify email with invalid verification number', function(done) {
        var info = {
            username: uname,
            email: mail,
            verificationnum: 'invalid',
        }
        chai.request(server)
            .post('/user/verify-email')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(info)
            .end((err, res) => {
                res.should.have.status(400);
            done();
        });
    })

    describe('Correct verify', function(done) {
        var info = {
            username: uname,
            email: mail,
            verificationnum: 'WAIT',
        }
        chai.request(server)
            .post('/user/verify-email')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(info)
            .end((err, res) => {
                res.should.have.status(200);
            done();
        });
    })
})
