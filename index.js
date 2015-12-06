'use strict';

var API         = require('bool.js/api')
,   passport    = require('passport');

module.exports = new API.Middleware('booljs-passport', {
    action: passport.initialize()
});
