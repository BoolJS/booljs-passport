'use strict';

const { Middleware } = require('@booljs/api');
const Passport = require('passport');

module.exports = class BoolJSPassport extends Middleware {
    constructor () {
        super('booljs.passport', [require.resolve('./route_middleware')]);
    }

    action (instance) {
        let app = instance.getComponents();
        let { passport = {} } = app.configuration.get('security');

        let moduleName = passport.module || 'Passport';
        let strategiesList  = passport.strategies || [];

        let DAO = app.dao[moduleName] || class {};
        let dao = new DAO(Passport);

        for (let strategy of strategiesList) {
            if (dao[strategy] && typeof dao[strategy] === 'function') {
                Passport.use(strategy, dao[strategy](Passport));
            }
        }

        return Passport.initialize();
    }
};
