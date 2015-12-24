'use strict';

var booljs      = require('bool.js')
,   resolver    = require('../util/resolver');

booljs('com.example.api', [
    resolver(''), 'passport-http-bearer'
]).setBase('example').run();

global.Agent = require('supertest-as-promised');
