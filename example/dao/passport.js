'use strict';

module.exports = function (app) {
    let { Strategy } = app.utilities.PassportHttpBearer;

    this.bearer = () => new Strategy((token, done) => {
        if (token === '123456') {
            return done(null, { id: 'John Doe' });
        }
        return done(null, false);
    });
};
