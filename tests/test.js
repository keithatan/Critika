const add = require('./add');

/*
HOW TO USE

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

