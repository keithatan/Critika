var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var functions = require('../unitTestFunctions.js')


var testAccountToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmI3MThhNDc4N2RiMjY3MWQ2YmJkM2YiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTM4NzI2MDUyfQ.uEq6an0foYBiskXd4d3Ud6wnm94up07feS-UJxjxSSU'

chai.use(chaiHttp);

describe('Test GET user', function(){

    describe('Test GET /user/account', function(){

        it('GET request without auth token should return 401', function(done){
          chai.request(server).get('/user/account').end(function(err, res){
            res.should.have.status(401);
            done();
          });
        });
    
        it('GET request without correct auth token should return 401', function(done){
          chai.request(server).get('/user/account').set('x-auth', 'a bad key').end(function(err, res){
            res.should.have.status(401);
            done();
          });
        });
    
        it('GET requset with correct auth token should return 200', function(done){
          chai.request(server).get('/user/account').set('x-auth', testAccountToken).end(function(err, res){
            res.should.have.status(200);
            done();
          });
        });
    
        it('GET request should return an object with id, username, and email', function(done){
          chai.request(server).get('/user/account').set('x-auth', testAccountToken).end(function(err, res){
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('username');
            res.body.should.have.property('email');
            done();
          });
        })
        
     });
})