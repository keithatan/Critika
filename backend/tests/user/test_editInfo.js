var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var functions = require('../unitTestFunctions.js')

var testAccountToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmI3MThhNDc4N2RiMjY3MWQ2YmJkM2YiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTM4NzI2MDUyfQ.uEq6an0foYBiskXd4d3Ud6wnm94up07feS-UJxjxSSU'

chai.use(chaiHttp);

describe('test POST user/edit-info', function(){

    it('should return 400 if no email', function(done){
        chai.request(server).post('/user/edit-info')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('x-auth', testAccountToken)
        .send({securityquetion: 'ok'})
        .end(function(err, res){
            res.should.have.status(400);
            done();
         });
    })

    it('should return 400 if no securityquestio', function(done){
        chai.request(server).post('/user/edit-info')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('x-auth', testAccountToken)
        .send({email: 'connortodd21@gmail.com'})
        .end(function(err, res){
            res.should.have.status(400);
            done();
        });
    })

    it('should return 400 if bad email', function(done){
        chai.request(server).post('/user/edit-info')
        .set('content-type', 'application/x-www-form-urlencoded')
        .set('x-auth', testAccountToken)
        .send({email: 'bad email', securityquetion: 'ok'})
        .end(function(err, res){
            res.should.have.status(400);
            done();
        });
    })

})