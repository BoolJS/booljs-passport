'use strict';

var API         = require('booljs-api')
,   passport    = require('passport');

var usedStrategies = {};

module.exports = class BoolJSPassportRoute extends API.RouteMiddleware {
    constructor() {
        super('booljs-passport-route', 'omittable', {
            public: true
        });
    }

    action(_instance, router, route) {
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
    }
};
