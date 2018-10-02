var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

/* USAGE mocha /tests/<file> */

var testAccountToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmIzYjY2MGQ5MWZjMDNhZDg1OTFmODIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTM4NTA0Mzg0fQ.ivTO6L-Cmfe2y469aQUVDamlcgxmzuiInyV4ya5LAOY'

chai.use(chaiHttp);

describe('Test GET', function(){
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

  it('GET request without correct auth token should return 401', function(done){
    chai.request(server).get('/user/account').set('x-auth', 'a bad key').end(function(err, res){
      res.should.have.status(401);
      done();
    });
  });

});