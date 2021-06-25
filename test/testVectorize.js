const assert = require('assert');
const vectorize = require('../index.js').vectorize;

describe('Vectorize()', function () {
  it('should return empty map when inputString is ""', function () {
    let vector = vectorize("");
    assert.strictEqual(vector.size, 0);
  });
  it('should return ["a,1","b,1"] when inputString is "a,b"', function () {
    let vector = vectorize("a,b");
    assert.strictEqual(vector.size, 2);
    assert.strictEqual(vector.get('a'), 1);
    assert.strictEqual(vector.get('b'), 1);
  });
  it('should return ["a,1","b,1", "describe,1"] when inputString is "a{b describe {"', function () {
    let vector = vectorize("a{b describe {");
    assert.strictEqual(vector.size, 3);
    assert.strictEqual(vector.get('a'), 1);
    assert.strictEqual(vector.get('b'), 1);
    assert.strictEqual(vector.get("describe"),1);
  });
  it('should return ["a,1","b,2","describe,1"] when inputString is "a{b describe { b"', function () {
    let vector = vectorize("a{b describe { b");
    assert.strictEqual(vector.size, 3);
    assert.strictEqual(vector.get('a'), 1);
    assert.strictEqual(vector.get('b'), 2);
    assert.strictEqual(vector.get("describe"),1);
  });
});