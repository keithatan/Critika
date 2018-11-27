var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var User = require('../../model/user');

chai.use(chaiHttp);

var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL

describe('Test get all user submissions', function () {

  describe('Test with bad token', function () {
    it('Should return 401', function (done) {
      User.findOne({ username: uname }, (err, user) => {
        //do the get request here 

        var token = user['tokens'][0]['token'][0]

        chai.request(server)
          .get('/submission/mine')
          .set('content-type', 'application/x-www-form-urlencoded')
          .set('token', 'bad token')
          .send()
          .end((err, res) => {
            res.should.have.status(401)
            done()
          })
      });
    })
  })


  describe('Test with correct info', function () {
    it('Should return 200', function () {
      User.findOne({ username: uname }, (err, user) => {
        //do the get request here 

        var token = user['tokens'][0]['token'][0]

        chai.request(server)
          .get('/submission/mine')
          .set('content-type', 'application/x-www-form-urlencoded')
          .set('token', token)
          .send()
          .end((err, res) => {
            res.should.have.status(200)
            done()
          })
      });
    })
  })

})