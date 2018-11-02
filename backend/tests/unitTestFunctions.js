var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

var Submission = require('../model/submission');
var User = require('../model/user');
var Community = require('../model/community')

var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL
var verificationNum;

/*
 * Register function 
 */
function registerFunction(){
    chai.request(server).post('/user/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: uname, password: pword, email: mail, securityquestion: 'ok', securityquestionanswer: 'ok'})
        .end(function(err,res){
            verificationNum = header['verificationnum']
            res.should.have.status(200);
    })
}

/*
 * verify email function 
 */
function verifyEmailFunction(){

    User.findOne({username: uname}).then((user) => {
        chai.request(server).post('/user/verify-email')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({username: uname, email: mail, verificationNum: user['verificationNum'],})
            .end(function(err, res){
              res.should.have.status(200);
            })
    })

    
}

/*
 * Login function 
 */
function loginFunction(){
    chai.request(server).post('/user/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: uname, password: pword})
        .then(function(err, res){
            
            res.should.have.status(200);
     })
}

/*
 * get submissions function 
 */
function getSubmissionsFunction(){

}

/*
 * get user/account function 
 */
function userMineFunction(){

}

/*
 * edit info function 
 */
function editInfoFunction(){

}

/*
 * verify email function 
 */
function getAllUsersFunction(){

}

module.exports = {
    login: loginFunction,
    register: registerFunction,
    submissionMine: getSubmissionsFunction,
    userMine: userMineFunction,
    editInfo: editInfoFunction,
    verifyEmail: verifyEmailFunction,
    getAllUsers: getAllUsersFunction,
}

