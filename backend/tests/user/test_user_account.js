var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var User = require('../../model/user');

var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL

chai.use(chaiHttp);


describe('GET /user/account', function () {

  describe('Check if user is banned', () => {
    it('Should return 400', (done) => {


      var info = {
        username: uname,
        password: pword,
      }

      User.findOneAndUpdate({ username: uname }, { $set: { standing: 'banned' } }).then((res) => {

        var token = res['tokens'][0]['token'][0]


        chai.request(server)
          .get('/user/account')
          .set('content-type', 'application/x-www-form-urlencoded')
          .set('token', token)
          .send(info)
          .end((err, resp) => {
            // console.log(resp)
            resp.should.have.status(400)
            done()

            // console.log(res)
          });
        console.log(1)
      }).catch((err) => {
        console.log(err)
      })
    })




    describe('Check if user is not authenticated', () => {
      it('Should return 401', (done) => {
        var info = {
          username: uname,
          password: pword,
        }
        User.findOneAndUpdate({ username: uname }, { $set: { standing: 'good' } }).then((user) =>{
          User.findOne({ username: uname }, (err, user) => {
            chai.request(server)
              .get('/user/account')
              .set('content-type', 'application/x-www-form-urlencoded')
              .set('token', 'bad token')
              .send(info)
              .end((err, res) => {
                res.should.have.status(401)
                done()
              })
          });
        })
      })
    })

    describe('Correct request', () => {

      it('Should return 200', (done) => {
        var info = {
          username: uname,
          password: pword,
        }

        User.findOneAndUpdate({ username: uname }, { $set: { standing: 'good' } }).then((user) => {
          var token = user['tokens'][0]['token'][0]

          chai.request(server)
            .get('/user/account')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('token', token)
            .send(info)
            .end((err, res) => {
              console.log(res)
              res.should.have.status(200)
              // console.log(res)
              done()
            })
        })
      });
    })

  })
})
