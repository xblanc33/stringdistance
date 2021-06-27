const assert = require('assert');
const vectorize = require('../index.js').vectorize;
const asymetricDistance = require('../index.js').asymetricDistance;
const asymetricCoverage = require('../index.js').asymetricCoverage;
const addWeightedVectors = require('../index.js').addWeightedVectors;

const PRACTICES = [
    {
        name: "A Value Object is defined by its values",
        description: "les Value Object doivent être définies par leur propriété (égalité par valeur). On devrait trouver une méthode d'égalité qui vérifie ce point."
    },
    {
        name:"An Entity is defined by its id", 
        description: "les Entity doivent être définies par leur id (égalité par id). On devrait trouver un id et une méthode d'égalité qui vérifie ce point."
    },
    {
        name:"An Aggregate is defined by its id", 
        description: "les agregats doivent être définis par leur id (égalité par id). Tout comme les entity, on devrait trouver un id et une méthode d'égalité qui vérifie ce point."
    },
    {
        name:"A Value Object is immutable", 
        description: "un Value Object ne change jamais au cours du temps. Il faut vérifier que toutes les valeurs sont définies dans le constructeur. De plus, il ne faut aucune méthode qui change les valeurs."
    },
    {
        name:"An Entity has a state that is mutable", 
        description: "une Entity a un état qui change au cours du temps. On doit bien voir des propriétés qui peuvent changer."
    },
    {
        name:"An Aggregate controls some Entities", 
        description: "un agregat contient des entity ; il contrôle leur cycle de vie. On doit voir des entity référencées par l'aggregate."
    },
    {
        name:"An Entity should provide business methods that respect encapsulation", 
        description: "une Entity propose des méthodes métiers (nommage métier); celles-ci peuvent faire changer l'état de l'entity. Il faut faire attention au nommage métier (pas de setXXX). Il faut faire attention à l'encapsulation (l'Entity ne doit pas donner accès à son état)"
    },
    {
        name:"An Aggregate should provide business methods that respect encapsulation", 
        description: "un agregat propose des méthodes métiers (nommage métier); celles-ci peuvent faire changer l'état de l'agrégat. Il faut faire attention au nommage métier. Il faut faire attention à l'encapsulation (l'Entity ne doit pas donner accès à son état et surtout pas donner de référence vers les entity qu'il contrôle)"
    }
]

const CODE = `constructor(id : string, depart : PointGPS, arrive : PointGPS) {
    this._id = id;
    this._depart = depart\;
    this._arrive = arrive
    this._bateaux = new Map();
    this._estOuverteAuxInscriptions = true;
    this._aDemarre = false;
}`;

describe('sort practices', function () {
  it('should sort them according to asymetricDistance', function () {
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
  });
  it('should sort them according to asymetricDistance', function () {
    const practicesVector = PRACTICES.map((practices) => {
        const nameVector = vectorize(practices.name);
        const descVector = vectorize(practices.description);
        return addWeightedVectors([{vector: nameVector, weight:10}, {vector: descVector, weight:1}])
    })
    const codeVector = vectorize(CODE);
    let closestPractice;
    let coverage = 0;
    practicesVector.forEach((practiceVector,i) => {
        const practiceCoverage = asymetricCoverage(codeVector, practiceVector);
        if (practiceCoverage > coverage) {
            coverage = practiceCoverage;
            closestPractice = PRACTICES[i];
        }
    })
    console.log(closestPractice.name);
    console.log(coverage);
});
});