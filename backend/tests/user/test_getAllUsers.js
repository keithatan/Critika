var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var functions = require('../unitTestFunctions.js')

var Submission = require('../model/submission');
var User = require('../model/user');
var Community = require('../model/community')

var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL

chai.use(chaiHttp);

describe('Test GET allUsers', () => {

    before(function(done){
        User.remove({username: uname}, function(err){
            console.log(err)
        })
        done();
    })

    describe('User is not an admin', () =>{

    })

    describe('User has bad auth', () =>{

    })

    describe('Correct info', () =>{

    })
})