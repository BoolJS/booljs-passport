'use strict';

const Bool = require('booljs');

describe('Bearer', () => {
    let agent;

    before(async () => {
        let api = await new Bool('com.example.api').run();
        agent = new Agent(api.server);
    });

    it(`Unauthenticated request returns 401`, () => (agent
        .get('/dogs')
        .expect(401)
    ));

    it(`Authenticated request returns 200`, () => (agent
        .get('/dogs')
        .set('Authorization', 'Bearer 123456')
        .expect(200)
    ));
});
