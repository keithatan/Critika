var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var functions = require('../unitTestFunctions.js')

var testAccountToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmI3MThhNDc4N2RiMjY3MWQ2YmJkM2YiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTM4NzI2MDUyfQ.uEq6an0foYBiskXd4d3Ud6wnm94up07feS-UJxjxSSU'

chai.use(chaiHttp);

describe('Test GET allUsers', function(){

    it('Should return access denied if the x-auth token is bad', function(done){
        chai.request(server).get('/user/allUsers').set('x-auth', 'bad token').end(function(err, res){
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body['message'].should.equal('401 ERROR: Access Denied');
          done();
        });
    })

    it('Should return an object of all users', function(done){
        chai.request(server).get('/user/allUsers').set('x-auth', testAccountToken).end(function(err, res){
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    })

})