var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

/* USAGE mocha /tests/<file> */

var testAccountToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmIzYjY2MGQ5MWZjMDNhZDg1OTFmODIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTM4NTA0Mzg0fQ.ivTO6L-Cmfe2y469aQUVDamlcgxmzuiInyV4ya5LAOY'

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
        res.body.should.be.a('array');
        res.body[0].should.have.property('numberOfCritiquesRecieved');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('category');
        res.body[0].should.have.property('submissionName');
        res.body[0].should.have.property('submissionText');
        res.body[0].should.have.property('username');
        res.body[0].should.have.property('dateSubmitted');
        res.body[0].should.have.property('__v');
        done();
      });
    })
  });

});