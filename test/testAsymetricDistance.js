const assert = require('assert');
const vectorize = require('../index.js').vectorize;
const asymetricDistance = require('../index.js').asymetricDistance;

describe('AsymetricDistance()', function () {
  it('should return baseVector distance to 0 when inputString are different', function () {
    const baseVector = vectorize("function f(){}");
    const fromVector = vectorize("class A {}");
    const distance = asymetricDistance(fromVector, baseVector);
    assert.strictEqual(distance, Math.sqrt(2));
  });
  it('should return 0 when inputString are the same', function () {
    const baseVector = vectorize("function f(){}");
    const fromVector = vectorize("function f(){}");
    const distance = asymetricDistance(fromVector, baseVector);
    assert.strictEqual(distance, 0);
  });
});