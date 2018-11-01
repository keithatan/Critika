var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

/* USAGE mocha /tests/<file> */


chai.use(chaiHttp);

var Submission = require('../model/submission');
var User = require('../model/user');
var Community = require('../model/community')

/*
 * Login function 
 */
function loginFunction(){
    chai.request(server).post('/user/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({username: 'unitTestUsername', password: 'password'})
        .end(function(err, res){
            res.should.have.status(200);
    })
}

/*
 * Register function 
 */
function registerFunction(){

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

