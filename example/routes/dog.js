'use strict';

module.exports = class {
    constructor (app) {
        let dog = new app.controllers.Dog();

        return [ {
            method: 'get',
            url: '/dogs',
            action: dog.list,
            cors: true
        } ];
    }
};
