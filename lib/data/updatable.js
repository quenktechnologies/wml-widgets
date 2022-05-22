"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
var util_1 = require("../util");
/**
 * update an Updatable Widget in a view with the data provided.
 */
exports.update = function (view, id, data) {
    return util_1.getById(view, id).map(function (w) { return w.update(data); });
};
//# sourceMappingURL=updatable.js.map