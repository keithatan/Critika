const add = require('./add');

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

test('add 1+2=3', () => {
  expect(add(1, 2)).toBe(3);
});

test('add 10+20=30', () => {
  expect(add(10, 20)).toBe(30);
});

