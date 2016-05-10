'use strict';

var API         = require('booljs-api')
,   passport    = require('passport');

module.exports = class BoolJSPassport extends API.Middleware {
    constructor() {
        super('booljs-passport', [ require.resolve('./route_middleware') ]);
    }

    action(_instance) {
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
};
