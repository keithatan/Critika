var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

/* USAGE mocha /tests/<file> */


chai.use(chaiHttp);

describe('Test register route', function(){

    it('test registering without any information', function(done){
        chai.request(server).post('/user/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .end(function(err, res){
            res.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('message', "User data is incomplete")
        })
        done();
    })

    it('test registering without password', function(done){
        chai.request(server).post('/user/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'kcsodetz', email: 'kcsodetz@gmail.com', securityquestion: 'ok'})
        .end(function(err, res){
            res.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('message', "User data is incomplete")
        })
        done();
    })


    it('test registering without username', function(done){
        chai.request(server).post('/user/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({password: 'password', email: 'kcsodetz@gmail.com', securityquestion: 'ok'})
        .end(function(err, res){
            res.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('message', "User data is incomplete")
        })
        done();
    })

    it('test registering without email', function(done){
        chai.request(server).post('/user/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'kcsodetz', password: 'password',  securityquestion: 'ok'})
        .end(function(err, res){
            res.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('message', "User data is incomplete")
        })
        done();
    })

    it('test registering without security question', function(done){
        chai.request(server).post('/user/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'kcsodetz', password: 'password', email: 'kcsodetz@gmail.com'})
        .end(function(err, res){
            res.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('message', "User data is incomplete")
        })
        done();
    })

    it('test registering with username that is too short', function(done){
        chai.request(server).post('/user/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'one', password: 'password', email: 'kcsodetz@gmail.com', securityquestion: 'ok'})
        .end(function(err, res){
            res.should.be.a('object');
            res.body.should.have.property('errors');
            res.body['errors'].should.have.property('username');
            res.body['errors']['username'].should.have.property('name');
            res.body['errors']['username']['name'].should.equal('ValidatorError');
        })
        done();
    })

    it('test registering with password that is too short', function(done){
        chai.request(server).post('/user/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'username', password: 'two', email: 'kcsodetz@gmail.com', securityquestion: 'ok'})
        .end(function(err, res){
            res.should.be.a('object');
            res.body.should.have.property('errors');
            res.body['errors'].should.have.property('password');
            res.body['errors']['password'].should.have.property('name');
            res.body['errors']['password']['name'].should.equal('ValidatorError');
        })
        done();
    })

    it('test registering with duplicate username', function(done){
        chai.request(server).post('/user/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'backendtestaccount234555', password: 'password', email: 'kcsodetz@gmail.com', securityquestion: 'ok'})
        .end(function(err, res){
            res.should.be.a('object');
            res.should.have.property('diver');
            res['code'].should.equal(11000);

        })
        done();
    })

    it('test registering with invalid email', function(done){
        chai.request(server).post('/user/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'username', password: 'password', email: 'kcsodetz', securityquestion: 'ok'})
        .end(function(err, res){
            res.should.be.a('object');
            res.body.should.have.property('errors');
            res.body['errors'].should.have.property('email');
            res.body['errors']['email'].should.have.property('name');
            res.body['errors']['email']['name'].should.equal('ValidatorError');
        })
        done();
    })

    it('test registering with correct information', function(done){

        done();
    })
})

