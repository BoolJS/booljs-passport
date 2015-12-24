'use strict';

module.exports = function (route) {
    return require('path').join(require.resolve('..'), '..', route);
};
