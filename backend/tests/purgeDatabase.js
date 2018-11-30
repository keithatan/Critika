var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var User = require('../model/user');
var Feedback = require('../model/feedback')
var Category = require('../model/category')
var Submission = require('../model/submission');


chai.use(chaiHttp);

var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL

Feedback.deleteMany({}).then(() => {
    Feedback.deleteMany({}).then(() => {
        Submission.deleteMany({}).then(() => {
            Category.deleteMany({}).then(() => {
                User.deleteMany({}).then(() => {
                    console.log('PURGE')
                    return;
                })
                console.log('PURGE')
                return
            })
            console.log('PURGE')
            return
        })
        console.log('PURGE')
        return
    })
})
console.log('PURGE')

