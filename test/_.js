'use strict';

const Bool = require('booljs');
const resolver = require('../util/resolver');

const chai = require('chai');
chai.use(require('chai-as-promised'));

global.expect = chai.expect;
global.Agent = require('supertest-as-promised');

async function main () {
    const dependencies = [
        '@booljs/express',
        resolver(''), 'passport-http-bearer'
    ];

    try {
        return new Bool('com.example.api', dependencies)
            .setBase('example')
            .setServerDrivers('booljs.express')
            .run();
    } catch (error) {
        throw error;
    }
}

main();
