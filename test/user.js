'use strict';

describe('User', () => {
    var booljs  = require('bool.js')
    ,   agent;

    before(() => {
        return booljs('com.example.api').run().then(function (api) {
            agent = new Agent(api.server);
        });
    });

    it(`Unauthenticated request returns 401`, () => {
        return (agent
            .get('/users/me')
            .set('Authorization', 'Bearer 123456')
            .expect(200)
        ).then(res => res.body).then(body => {
            /* jshint -W030 */ expect(body.data).to.exist;
        });
    });
});
