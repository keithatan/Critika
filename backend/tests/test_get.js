var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

var testAccountToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmIxYjMxYTQ4YzI1ODNlMzlmOGFkMGQiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTM4MzcyMzc4fQ.Tt7O59dbviLi69tQ6DbBJSTjrDTku_sYeFCEROlUvLQ'

chai.use(chaiHttp);

describe('Test GET', function(){
  it('should list all users on /user GET', function(done){
    chai.request(server).get('/user/account', {'x-auth': testAccountToken}).end(function(err, res){
      res.should.have.status(200);
      done();
    });
  });
});