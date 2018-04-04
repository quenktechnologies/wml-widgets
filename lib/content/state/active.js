"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
///classNames:begin
/**
 * ACTIVE
 */
exports.ACTIVE = '-active';
/**
 * deactivate this nav list item.
 */
exports.deactivate = function (a) { return function (fn) { return function () {
    return fn()
        .map(function (e) { return e.classList.remove(exports.ACTIVE); })
        .map(function () { return a; })
        .orJust(function () { return a; })
        .get();
}; }; };
/**
 * activate this nav list Item.
 */
exports.activate = function (a) { return function (fn) { return function () {
    return fn()
        .map(function (e) {
        e.classList.remove(exports.ACTIVE);
        e.classList.add(exports.ACTIVE);
    })
        .map(function () { return a; })
        .orJust(function () { return a; })
        .get();
}; }; };
//# sourceMappingURL=active.js.map