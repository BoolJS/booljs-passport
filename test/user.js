'use strict';

const Bool = require('booljs');

describe('User', () => {
    let agent;

    before(async () => {
        let api = await new Bool('com.example.api').run();
        agent = new Agent(api.server);
    });

    it(`Unauthenticated request returns 401`, () => (agent
        .get('/users/me')
        .set('Authorization', 'Bearer 123456')
        .expect(200)
    ).then(res => res.body).then(body => expect(body.data).to.exist));
});
