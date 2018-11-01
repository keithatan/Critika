var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var functions = require('./unitTestFunctions.js')


var testAccountToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmI3MThhNDc4N2RiMjY3MWQ2YmJkM2YiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTM4NzI2MDUyfQ.uEq6an0foYBiskXd4d3Ud6wnm94up07feS-UJxjxSSU'

chai.use(chaiHttp);

describe('Test GET Submission', function(){

  describe('Test GET /submission/mine', function(){

    it('GET request without auth token should return 401', function(done){
      chai.request(server).get('/submission/mine').end(function(err, res){
        res.should.have.status(401);
        done();
      });
    });

    it('GET request without correct auth token should return 401', function(done){
      chai.request(server).get('/submission/mine').set('x-auth', 'bad token').end(function(err, res){
        res.should.have.status(401);
        done();
      });
    });

    it('GET request without correct auth token should return 401', function(done){
      chai.request(server).get('/submission/mine').set('x-auth', testAccountToken).end(function(err, res){
        res.should.have.status(200);
        done();
      });
    });

    it('GET request should return all user submissions with proper response', function(done){
      chai.request(server).get('/submission/mine').set('x-auth', testAccountToken).end(function(err, res){
        res.should.be.json;
        res.should.have.status(200);
        done();
      });
    })
  });

});