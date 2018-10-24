'use strict';

const { RouteMiddleware } = require('@booljs/api');
const Passport = require('passport');

var usedStrategies = {};

module.exports = class BoolJSPassportRoute extends RouteMiddleware {
    constructor () {
        super('booljs.passport-route', 'omittable', { public: true });
    }

    action (instance, router, { authentication = {} }) {
        let app = instance.getComponents();

        let { passport: { defaultStrategy, strategyOptions } = {} } = app
            .configuration
            .get('security') || {};

        let strategy = authentication.strategy || defaultStrategy;
        let authOptions = authentication.options || strategyOptions;

        if (!usedStrategies[strategy]) {
            let middleware;

            if (strategy && authOptions) {
                middleware = Passport.authenticate(strategy, authOptions);
            } else if (strategy) {
                middleware = Passport.authenticate(strategy);
            } else {
                middleware = (req, res, next) => { next(); };
            }

            usedStrategies[strategy] = middleware;
        }

        return [ usedStrategies[strategy], (req, res, next) => {
            if (req.query.access_token) {
                delete req.query.access_token;
            }

            return next();
        } ];
    }
};
