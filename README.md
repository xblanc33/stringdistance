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