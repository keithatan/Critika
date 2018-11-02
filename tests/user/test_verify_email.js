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


describe('Verify Email', () => {

    describe('Verify email without any info', function() {
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

    describe('Verify email without verification num', function() {
        it('Should return 400', (done) => {
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
    })

    describe('Verify email without email', function() {
        it('Should return 400', (done) => {
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
    })

    describe('Verify email without username', function() {
        it('Should return 400', (done) => {
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
    })

    describe('Verify email with invalid verification number', function() {
        it('Should return 400', (done) => {
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
    })

    describe('Correct verify', function() {
        it('Should return 200', (done) => {
            User.findOne({username: uname}, (err, user) => {
                if(err){
                    console.log(err)
                    return
                }
                console.log(err)
                //console.log(user['verificationNum'])
                let info = {
                    username: uname,
                    email: mail,
                    verificationNum: user['verificationNum'],
                }

                chai.request(server)
                    .post('/user/verify-email')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send(info)
                    .end((err, res) => {
                        if(err){
                            console.log(err)
                            return
                        }
                        //console.log(info)
                        res.should.have.status(200);
                    done();
                });
            })
    
        })
    })
})
