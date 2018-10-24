'use strict';

module.exports = function (app) {
    let json = new app.views.Json();

    this.get = function (req, res) {
        json.standard(req.user, res);
    };
};
