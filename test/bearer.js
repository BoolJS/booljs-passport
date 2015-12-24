'use strict';

describe('Plugin', () => {

    it('Integrity test passes', () => {
        require('..').checkIntegrity();
    });
});

describe('Bearer', () => {
    var booljs  = require('bool.js')
    ,   agent;

    before(() => {
        return booljs('com.example.api').run().then(function (api) {
            agent = new Agent(api.server);
        });
    });

    it(`Unauthenticated request returns 401`, () => {
        return (agent
            .get('/dog')
            .expect(401)
        );
    });

    it(`Authenticated request returns 200`, () => {
        return (agent
            .get('/dog')
            .set('Authorization', 'Bearer 123456')
            .expect(200)
        );
    });
});
