var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var functions = require('../unitTestFunctions.js')

chai.use(chaiHttp);

describe('Test verify email', function(){
    it('should return 400 if there is no verification num', function(done){
        chai.request(server).post('/user/verify-email')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'unitTestUsername', email: 'kcsodetz@gmail.com',})
        .end(function(err, res){
            res.should.have.status(400);
        })
        done();
    })

    it('should return 400 if there is no email', function(done){
        chai.request(server).post('/user/verify-email')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'unitTestUsername', verificationNum: '9979',})
        .end(function(err, res){
            res.should.have.status(400);
        })
        done();
    })

    it('should return 400 if there is no username', function(done){
        chai.request(server).post('/user/verify-email')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({email: 'connortodd21spam@gmail.com', verificationNum: '9979',})
        .end(function(err, res){
            res.should.have.status(400);
        })
        done();
    })

    it('should return 200 if the email is registerd', function(done){
        chai.request(server).post('/user/verify-email')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'unitTestKenKen213', email: 'connortodd21spam@gmail.com', verificationNum: '9979',})
        .end(function(err, res){
            res.should.have.status(200);
        })
        done();
    })

})