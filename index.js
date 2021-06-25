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

function asymetricDistance(fromVector, toVector) {
    let sum = 0;
    toVector.forEach((k,v) => {
        sum += Math.pow(fromVector.get(k) - v,2);
    });
    return Math.sqrt(sum);

}

module.exports = {tokenize, vectorize, asymetricDistance};