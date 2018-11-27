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

describe('test add friend', function () {

    this.beforeAll(function() {
        User.findOneAndDelete({username: 'Jeff Brohm'}).then(() => {
            //register user to add ads friend
        var info = {
            username: 'Jeff Brohm',
            password: 'Purdue Pete',
            email: 'purdue@email.com',
            securityquestion: 'ok',
            securityquestionanswer: 'ok',
        }
        chai.request(server)
            .post('/user/register')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send(info).then((pls) => {
                console.log(pls)
            //verify email for user
            User.findOne({username: 'Jeff Brohm'}, (err, user) => {
                if(err){
                    console.log(err)
                    return
                }
                let info = {
                    username: 'Jeff Brohm',
                    email: 'purdue@email.com',
                    verificationNum: user['verificationNum'],
                }

                chai.request(server)
                    .post('/user/verify-email')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .send(info)
                    .end((err, res) => {
                        if(err){
                            console.log(err)
                            return
                        }
                    done();
                });
            })
        })
        })
    })

    describe('add friend without friend', function (done) {
        it('should return 400', function (done) {
            
            var info = {
                friend: 'Jeff Brohm',
            }

            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 

                var token = user['tokens'][0]['token'][0]

                chai.request(server)
                    .post('/user/add-friend')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .set('token', token)
                    .send()
                    .end((err, res) => {
                        res.should.have.status(400)
                        done()
                    })
            });
        })
    })

    describe('add friend without security answer', function (done) {
        it('should return 400', function (done) {
            var info = {
                email: mail,
                securityquestion: 'ok',
            }

            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 

                var token = user['tokens'][0]['token'][0]

                chai.request(server)
                    .post('/user/add-friend')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .set('token', token)
                    .send(info)
                    .end((err, res) => {
                        res.should.have.status(400)
                        done()
                    })
            });
        })
    })

    describe('add friend with bad auth', function (done) {
        it('should return 401', function (done) {
            var info = {
                email: mail,
                securityquestion: 'ok',
                securityquestionanswer: 'ok'
            }

            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 

                var token = user['tokens'][0]['token'][0]

                chai.request(server)
                    .post('/user/add-friend')
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

    describe('add friend with correct information', function (done) {
        it('should return 200', function (done) {
            var info = {
                friend: 'Jeff Brohm'
            }

            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 

                var token = user['tokens'][0]['token'][0]

                chai.request(server)
                    .post('/user/add-friend')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .set('token', token)
                    .send(info)
                    .end((err, res) => {
                        console.log(res)
                        res.should.have.status(200)
                        done()
                    })
            });
        })
    })
})