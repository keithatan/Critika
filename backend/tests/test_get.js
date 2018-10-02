var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

var testAccountToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmIzYjY2MGQ5MWZjMDNhZDg1OTFmODIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTM4NTA0Mzg0fQ.ivTO6L-Cmfe2y469aQUVDamlcgxmzuiInyV4ya5LAOY'

chai.use(chaiHttp);

describe('Test GET', function(){
  it('response should be 200 with proper auth token', function(done){
    chai.request(server).get('/user/account').set('x-auth', testAccountToken).end(function(err, res){
      res.should.have.status(200);
      done();
    });
  });
});