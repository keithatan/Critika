var express = require('express');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../app');
var should = chai.should();
var User = require('../../model/user');
var Category = require('../../model/category')

chai.use(chaiHttp);

var uname = process.env.UNIT_TEST_USERNAME
var pword = process.env.UNIT_TEST_PASSWORD
var mail = process.env.UNIT_TEST_EMAIL

describe('Test get all user submissions', function () {

    this.beforeAll(function() {
        var info = {
            categoryName: 'example category',
            categoryDescription: 'example description'
        }

        User.findOne({ username: uname }, (err, user) => {
            //do the get request here 

            var token = user['tokens'][0]['token'][0]

            chai.request(server)
                .post('/category/create-category')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set('token', token)
                .send(info)
                .end((err, res) => {
                    done()
                })
        });
    })

    this.beforeAll(function() {
        var info = {
            categoryName: 'example category',
            categoryDescription: 'example description'
        }

        Category.findOneAndDelete
    })

    describe('Test without category', function () {
        it('Should return 400', function (done) {
            var info = {
                
            }
        })
    })

    describe('Test without submission name', function () {
        it('Should return 400', function (done) {

        })
    })

    describe('Test without submission text', function () {
        it('Should return 400', function (done) {

        })
    })

    describe('Test with invalid category', function () {
        it('Should return 400', function (done) {

        })
    })

    describe('Test with invalid token', function () {
        it('Should return 401', function (done) {

        })
    })

    describe('Test with correct info', function () {
        it('Should return 200', function (done) {

        })
    })

})