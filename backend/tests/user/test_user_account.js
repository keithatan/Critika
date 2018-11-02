var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var functions = require('../unitTestFunctions.js')
var User = require('../../model/user');

var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL

chai.use(chaiHttp);


describe('GET /user/account', function() {

  describe('Check if user is banned', () =>{
    User.findOneAndUpdate({username: uname}, {$set: {standing: 'banned'}})

    it('Should return 400', (done) => {

      var info = {
        username: uname,
        password: pword,
      }

      User.findOne({username: uname}, (err, user) => {
        chai.request(server)
        .post('/user/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(info)
        .end((err, res) => {
         // console.log(res.header)
          //do the get request here 
          chai.request(server)
          .get('/user/account')
          .set('content-type', 'application/x-www-form-urlencoded')
          .set('token', res.header['token'])
          .end((err, res) => {
            res.should.have.status(400)
           // console.log(res)
          })
         })
        });
      
      done()
    })
  })

  describe('Check if user is not authenticated', () =>{
    User.findOneAndUpdate({username: uname}, {$set: {standing: 'good'}})
    it('Should return 400', (done) => {
      var info = {
        username: uname,
        password: pword,
      }
      User.findOne({username: uname}, (err, user) => {
        chai.request(server)
        .post('/user/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(info)
        .end((err, res) => {
          //do the get request here 
          chai.request(server)
          .get('/user/account')
          .set('content-type', 'application/x-www-form-urlencoded')
          .set('token', 'bad token')
          .end((err, res) => {
            res.should.have.status(400)
           // console.log(res)
          })
         })
        });
      
      done()
    })
  })

  describe('Correct request', () =>{
    User.findOneAndUpdate({username: uname}, {$set: {standing: 'good'}})

    it('Should return 200', (done) => {
      var info = {
        username: uname,
        password: pword,
      }

      User.findOne({username: uname}, (err, user) => {
        chai.request(server)
        .post('/user/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(info)
        .end((err, res) => {
         // console.log(res.header)
          //do the get request here 
          chai.request(server)
          .get('/user/account')
          .set('content-type', 'application/x-www-form-urlencoded')
          .set('token', res.header['token'])
          .end((err, res) => {
            res.should.have.status(400)
           // console.log(res)
          })
         })
        });
      
      done()
    })
  })

})
