var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var User = require('../../model/user');
var Category = require('../../model/category')
var Submission = require('../../model/submission')

chai.use(chaiHttp);

var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL

describe('Test remove submissions', function () {

    this.beforeAll(function(done) {
        var info = {
            category: 'example category',
            submissionName: 'submission to remove',
            submissionText: 'submission text',
            submissionDescription: 'submission description',
            submissionLink: 'submission link',
            submissionSkillLevel: 'submission skill level'

        }
        User.findOne({ username: uname }, (err, user) => {
            //do the get request here 

            var token = user['tokens'][0]['token'][0]

            chai.request(server)
                .post('/submission/add')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set('token', token)
                .send(info)
                .end((err, res) => {
                    done()
                })
        });
    })

    describe('Test without submission', function () {
        it('Should return 400', function (done) {

            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/submission/remove')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .set('token', token)
                    .send()
                    .end((err, res) => {
                        res.should.have.status(400);
                        done()
                    })
            });
        })
    })

    describe('Test with bad auth', function () {
        it('Should return 401', function (done) {
            var info = {
                submissionName: 'submission to remove'
            }
            User.findOne({ username: uname }, (err, user) => {
                //do the get request here 
    
                var token = user['tokens'][0]['token'][0]
    
                chai.request(server)
                    .post('/submission/remove')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .set('token', 'bad token')
                    .send(info)
                    .end((err, res) => {
                        res.should.have.status(401);
                        done()
                    })
            });
        })
    })

    describe('Test with correct info', function () {
        it('Should return 200', function (done) {

            Submission.findOne({submissionName: 'submission to remove'}).then((sub) => {

                var info = {
                    submissionID: sub['_id'].toString()
                }

                User.findOne({ username: uname }, (err, user) => {
                    //do the get request here 
        
                    var token = user['tokens'][0]['token'][0]
        
                    chai.request(server)
                        .post('/submission/remove')
                        .set('content-type', 'application/x-www-form-urlencoded')
                        .set('token', token)
                        .send(info)
                        .end((err, res) => {
                            res.should.have.status(200);
                            done()
                        })
                });
            })            
        })
    })

})