var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var functions = require('../unitTestFunctions.js')
var User = require('../../model/user');

chai.use(chaiHttp);

var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL

describe('Submission/mine', function(){

  describe('Test with bad token', function(){
    it('Should return 401', function(done) {
      var info = {
        username: uname,
        password: pword,
      }

      User.findOne({username: uname}, (err, user) => {
        chai.request(server)
        .post('/sub/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(info)
        .end((err, res) => {
          secondRequest(res)
         })
      });

      function secondRequest(res){
        console.log('here')
        request(server)
          .get('/submission/mine')
          .set('content-type', 'application/x-www-form-urlencoded')
          .set('token', res.header['token'])
          .end((err, res) => {
            console.log('here2')
            res.should.have.status(401)
          })
      }
      done()
    })
  })

  
  describe('Test with bad token', function(){
    it('Should return 401', function() {
      
    })
  })

  describe('Should work', function(){
    it('Should return 200', function() {
      
    })
  })

})