var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
require('dotenv').config();

/* USAGE mocha /tests/<file> */


chai.use(chaiHttp);

var Submission = require('../model/submission');
var User = require('../model/user');
var Community = require('../model/community')

var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL

/*
 * Login function 
 */
function loginFunction(){
    chai.request(server).post('/user/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: uname, password: pword})
        .end(function(err, res){
            res.should.have.status(200);
    })
}

/*
 * Register function 
 */
function registerFunction(){
    chai.request(server).post('/user/register')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: uname, password: pword, email: mail, securityquestion: 'ok', securityAnswer: 'ok'})
        .end(function(err,res){
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
function verifyEmailFunction(){

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
    veriyEmail: verifyEmailFunction,
    getAllUsers: getAllUsersFunction,
}

