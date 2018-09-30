const add = require('./add');
const user = require('../model/user.js')

/*
HOW TO USE

EITHER RUN npm test TO TEST EVERYTHING
ex: npm test
OR
jest <rout to file to test>
ex: jest tests/test.js

EXAMPLE TEMPLATE CODE

test(<describe the test>, () => {
  expect(<function().toBe(<correct value>);
});

EXAMPLES BELOW
DONE USING JEST
*/


var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});

