var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var User = require('../../model/user');
var Feedback = require('../../model/feedback')
var Category = require('../../model/category')


chai.use(chaiHttp);

var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL

describe('test get all feedback for a usre', function () {

    describe('Rate feedback without rating', function (done) {

    })

    describe('Rate feedback without submissionID', function (done) {

    })

    describe('Rate feedback without being owner', function (done) {

    })

    describe('Rate feedback with bath auth', function (done) {

    })

    describe('Rate feedback with correct info', function (done) {

    })

})