'use strict';

/**
 * Get awesome things
 */
exports.awesomeThings = function (req, res) {
  res.json([
    {
      name: 'HTML5 Boilerplate',
      info: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
      awesomeness: 10
    },
    {
      name: 'AngularJS',
      info: 'AngularJS is a toolset for building the framework most suited to your application development.',
      awesomeness: 10
    },
    {
      name: 'Karma',
      info: 'Spectacular Test Runner for JavaScript.',
      awesomeness: 10
    },
    {
      name: 'Express',
      info: 'Flexible and minimalist web application framework for node.js.',
      awesomeness: 10
    }
  ]);
};

exports.allAvailableUsers = function (req, res) {
  res.json([
    {
      name: 'Melba Brewster',
      username: 'melba'
    },
    {
      name: 'Harriett Hodges',
      username: 'hhodges'
    },
    {
      name: 'Thomas Frost',
      username: 'tfrost'
    },
    {
      name: 'Diane Sparks',
      username: 'sparks231'
    }
  ]);
};

exports.allMeters = function (req, res) {
  res.json([
    "127",
    "Abdominal Cramps",
    "Benadryl",
    "Calories",
    "Constipation",
    "Decreased Hearing",
    "Ear Ache",
    "Ear Echo Right"
  ]);
};

exports.activeMedicines = function(req, res) {
  res.json([
    {
      drugName: 'Metformin',
      dosage: '500 mg 2-3 times daily',
      classification: 'Anti Diabetic agents'
    },
    {
      drugName: 'Amidiopine',
      dosage: '2.5 mg once daily',
      classification: 'Calcium Antagonist'
    },
    {
      drugName: 'Catapres',
      dosage: '75-150 mgc twice daily',
      classification: 'Anti Hypertensive'
    },
    {
      drugName: 'Metopolol',
      dosage: '50-100 mg once daily',
      classification: "Beta Blockers"
    }
  ])
}