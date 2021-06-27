const assert = require('assert');
const vectorize = require('../index.js').vectorize;
const addWeightedVectors = require('../index.js').addWeightedVectors;

describe('addWeightedVectors()', function () {
  it('should add two different Vectors', function () {
    let vector1 = vectorize("a,b");
    let vector2 = vectorize("c d");
    let vector = addWeightedVectors([{vector:vector1, weight:1},{vector:vector2, weight:1}]);
    assert.strictEqual(vector.size, 4);
    assert.strictEqual(vector.get('a'), 1);
    assert.strictEqual(vector.get('b'), 1);
    assert.strictEqual(vector.get('c'), 1);
    assert.strictEqual(vector.get('d'), 1);
  });
  it('should add two different Vectors with different weight', function () {
    let vector1 = vectorize("a,b");
    let vector2 = vectorize("c d");
    let vector = addWeightedVectors([{vector:vector1, weight:1},{vector:vector2, weight:2}]);
    assert.strictEqual(vector.size, 4);
    assert.strictEqual(vector.get('a'), 1);
    assert.strictEqual(vector.get('b'), 1);
    assert.strictEqual(vector.get('c'), 2);
    assert.strictEqual(vector.get('d'), 2);
  });
  it('should combine two different Vectors with different weight', function () {
    let vector1 = vectorize("a,b");
    let vector2 = vectorize("b c d");
    let vector = addWeightedVectors([{vector:vector1, weight:1},{vector:vector2, weight:2}]);
    assert.strictEqual(vector.size, 4);
    assert.strictEqual(vector.get('a'), 1);
    assert.strictEqual(vector.get('b'), 3);
    assert.strictEqual(vector.get('c'), 2);
    assert.strictEqual(vector.get('d'), 2);
  });
});