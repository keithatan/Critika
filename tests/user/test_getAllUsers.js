var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var functions = require('../unitTestFunctions.js')

var Submission = require('../../model/submission');
var User = require('../../model/user');
var category = require('../../model/category')

var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL

chai.use(chaiHttp);

describe('Test GET allUsers', () => {

    describe('User is not an admin', () =>{
        it('Should return 400', function(done) {
            var info = {
                username: uname,
                password: pword,
            }
        
            User.findOne({username: uname}, (err, user) => {
            chai.request(server)
            .post('/user/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(info)
            .end((err, res) => {
                //do the get request here 
                chai.request(server)
                .get('/user/allUsers')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set('token', res.header['token'])
                .
                end((err, res) => {
                    res.should.have.status(400)
                })
                })
            });
            done()
        })
    })

    describe('User has bad auth', () => {
        User.findOneAndUpdate({username: uname}, {$set: {status: 'admin'}})

        it('Should return 400', function(done) {
            var info = {
                username: uname,
                password: pword,
            }
        
            User.findOne({username: uname}, (err, user) => {
            chai.request(server)
            .post('/user/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(info)
            .end((err, res) => {
                //do the get request here 
                chai.request(server)
                .get('/user/allUsers')
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

    describe('Correct info', () =>{
        it('Should return 200', function(done) {
            var info = {
                username: uname,
                password: pword,
            }
        
            User.findOne({username: uname}, (err, user) => {
            chai.request(server)
            .post('/user/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(info)
            .end((err, res) => {
                //do the get request here 
                chai.request(server)
                .get('/user/allUsers')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set('token', res.header['token'])
                .
                end((err, res) => {
                    res.should.have.status(400)
                })
                })
            });
            done()
        })
    })
})