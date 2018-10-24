'use strict';

module.exports = class {
    constructor (app) {
        let user = new app.controllers.User();

        return [ {
            method: 'get',
            url: '/users/me',
            action: user.get,
            cors: true
        } ];
    }
};
