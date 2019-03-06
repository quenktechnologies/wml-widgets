"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../../util");
///classNames:begin
/**
 * ACTIVE
 */
exports.ACTIVE = '-active';
/**
 * activate helper.
 *
 * Adds the ACTIVE class.
 */
exports.activate = function (view, id) {
    return util_1.getById(view, id)
        .map(function (e) {
        e.classList.remove(exports.ACTIVE);
        e.classList.add(exports.ACTIVE);
    });
};
/**
 * deactivate helper.
 *
 * Removes the ACTIVE class.
 */
exports.deactivate = function (view, id) {
    return util_1.getById(view, id)
        .map(function (e) { return e.classList.remove(exports.ACTIVE); });
};
/**
 * isActive helpder
 *
 * Queries whether the ACTIVE class is present.
 */
exports.isActive = function (view, id) {
    return util_1.getById(view, id)
        .map(function (e) { return e.classList.contains(exports.ACTIVE); })
        .orJust(function () { return false; })
        .get();
};
//# sourceMappingURL=active.js.map