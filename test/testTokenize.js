const assert = require('assert');
const tokenize = require('../index.js').tokenize;

describe('Tokenize()', function () {
  it('should return [] when inputString is ""', function () {
    let tokens = tokenize("");
    assert.strictEqual(tokens.length, 0);
  });
  it('should return ["a","b"] when inputString is "a,b"', function () {
    let tokens = tokenize("a,b");
    assert.strictEqual(tokens.length, 2);
    assert.strictEqual(tokens[0], "a");
    assert.strictEqual(tokens[1], "b");
  });
  it('should return ["a","b"] when inputString is "a{b describe {"', function () {
    let tokens = tokenize("a{b describe {");
    assert.strictEqual(tokens.length, 3);
    assert.strictEqual(tokens[0], "a");
    assert.strictEqual(tokens[1], "b");
    assert.strictEqual(tokens[2], "describe");
  });
  it('should return ["a","b","b","describe"] when inputString is "a{b describe {b"', function () {
    let tokens = tokenize("a{b describe {b");
    assert.strictEqual(tokens.length, 4);
    assert.strictEqual(tokens[0], "a");
    assert.strictEqual(tokens[1], "b");
    assert.strictEqual(tokens[2], "b");
    assert.strictEqual(tokens[3], "describe");
  });
});