const assert = require('assert');
const vectorize = require('../index.js').vectorize;
const asymetricCoverage = require('../index.js').asymetricCoverage;

describe('AsymetricCoverage()', function () {
  it('should return 0 when inputString are different', function () {
    const baseVector = vectorize("function f(){}");
    const fromVector = vectorize("class A {}");
    const distance = asymetricCoverage(fromVector, baseVector);
    assert.strictEqual(distance, 0);
  });
  it('should return 1 (100%) when inputString are the same', function () {
    const baseVector = vectorize("function f(){}");
    const fromVector = vectorize("function f(){}");
    const distance = asymetricCoverage(fromVector, baseVector);
    assert.strictEqual(distance, 1);
  });
});