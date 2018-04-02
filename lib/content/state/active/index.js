"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var names = require("./classNames");
/**
 * deactivate this nav list item.
 */
exports.deactivate = function (a) { return function (fn) { return function () {
    return fn()
        .map(function (e) { return e.classList.remove(names.ACTIVE); })
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
        e.classList.remove(names.ACTIVE);
        e.classList.add(names.ACTIVE);
    })
        .map(function () { return a; })
        .orJust(function () { return a; })
        .get();
}; }; };
//# sourceMappingURL=index.js.map