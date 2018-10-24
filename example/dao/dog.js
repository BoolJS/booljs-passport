'use strict';

module.exports = class DogDAO {
    constructor (app) {
        this.dao = new app.models.Dog();
    }

    list () {
        return this.dao.list();
    };
};
