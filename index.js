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

module.exports = {tokenize, vectorize};