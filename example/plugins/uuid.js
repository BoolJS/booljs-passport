'use strict';

module.exports = class {
    constructor (app) { this.uuid = app.utilities.NodeUuid; };

    v1 () { return this.uuid.getV1(); }
    v4 () { return this.uuid.getV4(); }
};
