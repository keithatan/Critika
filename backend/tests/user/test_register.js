var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var functions = require('../unitTestFunctions.js')

chai.use(chaiHttp);
var User = require('../../model/user');

describe('Test register route', function(){

    it('test registering without any information', function(done){
        chai.request(server).post('/user/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .end(function(err, res){
            res.should.have.status(400)
        })
        done();
    })

    it('test registering without password', function(done){
        chai.request(server).post('/user/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'kcsodetz', email: 'kcsodetz@gmail.com', securityquestion: 'ok', securityquestionanswer: 'ok'})
        .end(function(err, res){
            res.should.have.status(400)
        })
        done();
    })


    it('test registering without username', function(done){
        chai.request(server).post('/user/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({password: 'password', email: 'kcsodetz@gmail.com', securityquestion: 'ok', securityquestionanswer: 'ok'})
        .end(function(err, res){
            res.should.have.status(400)
        })
        done();
    })

    it('test registering without email', function(done){
        chai.request(server).post('/user/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'kcsodetz', password: 'password',  securityquestion: 'ok', securityquestionanswer: 'ok'})
        .end(function(err, res){
            res.should.have.status(400)
        })
        done();
    })

    it('test registering without security question', function(done){
        chai.request(server).post('/user/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'kcsodetz', password: 'password', email: 'kcsodetz@gmail.com', securityquestionanswer: 'ok'})
        .end(function(err, res){
            res.should.have.status(400)
        })
        done();
    })

    it('test registering with username that is too short', function(done){
        chai.request(server).post('/user/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'one', password: 'password', email: 'kcsodetz@gmail.com', securityquestion: 'ok', securityquestionanswer: 'ok'})
        .end(function(err, res){
            res.should.have.status(400)
        })
        done();
    })

    it('test registering with password that is too short', function(done){
        chai.request(server).post('/user/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'username', password: 'two', email: 'kcsodetz@gmail.com', securityquestion: 'ok', securityquestionanswer: 'ok'})
        .end(function(err, res){
            res.should.have.status(400)
        })
        done();
    })

    it('test registering with invalid email', function(done){
        chai.request(server).post('/user/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'username', password: 'password', email: 'INVALID', securityquestion: 'ok', securityquestionanswer: 'ok'})
        .end(function(err, res){
            res.should.have.status(400)
        })
        done();
    })

    it('test registering with correct information', function(done){
        functions.register()
        done();
    })

})

