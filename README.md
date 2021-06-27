# Distance between strings

## install / test

    npm i
    npm test


## Create Tokens

    const tokenize = require('index.js').tokenize;
    tokenize('lorem ...');


## Create Vector

    const vectorize = require('index.js').vectorize;
    vectorize('lorem ...');

## Compute Asymetric Distance

    const vectorize = require('index.js').vectorize;
    const asymetricDistance = require('index.js').asymetricDistance;
    const baseV = vectorize('lorem ...');
    const fromT = vectorize('lorem ...');
    const distance = asymetricDistance(fromV, baseV);


## Weight in Vector

    const vector1 = vectorize("a,b");
    const vector2 = vectorize("b c d");
    const vector = addWeightedVectors([{vector:vector1, weight:1},{vector:vector2, weight:2}]);
    assert.strictEqual(vector.size, 4);
    assert.strictEqual(vector.get('a'), 1);
    assert.strictEqual(vector.get('b'), 3);
    assert.strictEqual(vector.get('c'), 2);
    assert.strictEqual(vector.get('d'), 2);

## Sort Practices

    const practicesVector = PRACTICES.map((practices) => {
        const nameVector = vectorize(practices.name);
        const descVector = vectorize(practices.description);
        return addWeightedVectors([{vector: nameVector, weight:10}, {vector: descVector, weight:1}])
    })
    const codeVector = vectorize(CODE);
    let closestPractice;
    let distance = Infinity;
    practicesVector.forEach((practiceVector,i) => {
        const practiceDistance = asymetricDistance(codeVector, practiceVector);
        if (practiceDistance < distance) {
            distance = practiceDistance;
            closestPractice = PRACTICES[i];
        }
    })
    console.log(closestPractice.name);
    console.log(distance);