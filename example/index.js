'use strict';

const Bool = require('booljs');

// Here is where magic happens
new Bool('com.example.api', [ 'node-uuid', require.resolve('..') ])
    .run();
