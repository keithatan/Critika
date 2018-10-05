var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

/* USAGE mocha /tests/<file> */

var testAccountToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmIzYjY2MGQ5MWZjMDNhZDg1OTFmODIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTM4NTA0Mzg0fQ.ivTO6L-Cmfe2y469aQUVDamlcgxmzuiInyV4ya5LAOY'

chai.use(chaiHttp);


describe('Test login', function(){

    it('login without username and password', function(done){
        chai.request(server).post('/user/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .end(function(err, res){
            res.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('message', "Login information is incomplete, missing username or password")
        })
        done();
    })
    it('login without password', function(done){
        chai.request(server).post('/user/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'kcsodetz'})
        .end(function(err, res){
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('message', "Login information is incomplete, missing username or password")
        })
        done();
    })

    it('login without username', function(done){
        chai.request(server).post('/user/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({password: 'kcsodetz'})
        .end(function(err, res){
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('message', "Login information is incomplete, missing username or password")
        })
        done();
    })

    it('login with bad username', function(done){
        chai.request(server).post('/user/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'badusername', password: 'badpassword'})
        .end(function(err, res){
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('message', "Error Loging in, Username or Password is incorrect")
        })
        done();
    })

    it('login with bad password', function(done){
        chai.request(server).post('/user/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'kcsodetz', password: 'badpassword'})
        .end(function(err, res){
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('message', "Error Loging in, Username or Password is incorrect")
        })
        done();
    })

    it('login with correct username and password', function(done){
        
        done();
    })
})

