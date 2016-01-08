'use strict';

var API         = require('bool.js/api')
,   passport    = require('passport');

var usedStrategies = {};

new API.RouteMiddleware('booljs-passport-route', {
    action: function (_instance, router, route) {
        var app             = _instance.getComponents()
        ,   configuration   = app.configuration.get('security')
        ,   strategy        = (
            route.authentication && route.authentication.strategy
        ) || (
             configuration.passport && configuration.passport.defaultStrategy
        )
        ,   authOptions     = (
            route.authentication && route.authentication.options
        ) || (
            configuration.passport && configuration.passport.strategyOptions
        );

        if(!usedStrategies[strategy]){
            var strategyMiddleware;

            if(strategy && authOptions){
                strategyMiddleware = passport.authenticate(
                    strategy, authOptions
                );
            } else if (strategy) {
                strategyMiddleware = passport.authenticate(strategy);
            } else {
                strategyMiddleware = (req, res, next) => { next(); };
            }

            usedStrategies[strategy] = strategyMiddleware;
        }

        return [
            usedStrategies[strategy],
            (req, res, next) => {
                if(req.query.access_token) delete req.query.access_token;
                next();
            }
        ];
    },
    type: 'omittable',
    policies: {
        public: true
    }
});

module.exports = new API.Middleware('booljs-passport', {
    action: function (_instance) {
        var app             = _instance.getComponents()
        ,   configuration   = app.configuration.get('security')
        ,   moduleName      = (
            configuration.passport && configuration.passport.module
        ) || 'Passport'
        ,   strategiesList  = (
            configuration.passport && configuration.passport.strategies
        ) || []
        ,   strategies = (
            app.dao[moduleName] && new app.dao[moduleName]()
        ) || {};

        for(var strategy of strategiesList){
            if(strategies[strategy]){
                passport.use(strategy, strategies[strategy](passport));
            }
        }

        return passport.initialize();
    }
});
