//const TOKEN_DELIMITERS = /[^A-Z]/i;
const TOKEN_DELIMITERS = /[^A-Za-zÀ-ÖØ-öø-ÿ]/;
const MINIMUM_TOKEN_LENGHT = 0;
const BLACK_LIST = [
    "should"
]

function tokenize(inputString) {
    return inputString.split(TOKEN_DELIMITERS)
    .filter((token)=>token != "")
    .filter((token) => token.length > MINIMUM_TOKEN_LENGHT)
    .map((token) => token.toLowerCase())
    .filter((token) => !BLACK_LIST.includes(token))
    .sort();
}

function vectorize(inputString) {
    return tokenize(inputString).reduce((vector, token) => {
        let occurence = vector.get(token);
        if (occurence != undefined) {
            vector.set(token, ++occurence);
        } else {
            vector.set(token, 1);
        }
        return vector;
    }, new Map());
}

function addWeightedVectors(weightedVectors) {
    const sum = new Map();
    weightedVectors.forEach((weightedVector) => {
        const weight = weightedVector.weight;
        const vector = weightedVector.vector;
        vector.forEach((value,key) => {
            let valueInSum = sum.get(key) ?? 0;
            sum.set(key, valueInSum + value * weight);
        })
    })
    return sum;
}

function asymetricDistance(fromVector, baseVector) {
    let sum = 0;
    baseVector.forEach((value,key) => {
        const fromPosition = fromVector.get(key) ?? 0;
        sum += Math.pow(Math.abs(fromPosition - value),2);
    });
    return Math.sqrt(sum);
}

function asymetricCoverage(fromVector, baseVector) {
    let fromCoverage = 0;
    let baseTotalCoverage = 0;
    baseVector.forEach((value,key) => {
        baseTotalCoverage += value;
        const isCoveringKey = fromVector.get(key) ? 1 : 0;
        fromCoverage += isCoveringKey * value;
    });
    return fromCoverage / baseTotalCoverage;
}



module.exports = {tokenize, vectorize, asymetricDistance, addWeightedVectors, asymetricCoverage};