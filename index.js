const TOKEN_DELIMITERS = /[^A-Z]/i;

function tokenize(inputString) {
    return inputString.split(TOKEN_DELIMITERS).filter((token)=>token != "").sort();
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
            sum.set(key) = valueInSum + value * weight;
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

module.exports = {tokenize, vectorize, asymetricDistance};