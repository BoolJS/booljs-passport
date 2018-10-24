'use strict';

module.exports = function (app) {
    let Dog = app.dao.Dog;
    let json = new app.views.Json();

    this.list = function (request, response, next) {
        let dog = new Dog();
        json.promise(dog.list(), response, next);
    };
};
