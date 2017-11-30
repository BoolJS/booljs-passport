'use strict';

const Bool = require('booljs');
const resolver = require('../util/resolver');

new Bool('com.example.api', [ resolver(''), 'passport-http-bearer' ])
    .setBase('example')
    .run();

const chai = require('chai');
chai.use(require('chai-as-promised'));

global.expect = chai.expect;
global.Agent = require('supertest-as-promised');
