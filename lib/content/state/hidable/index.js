"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var names = require("./classNames");
var Maybe_1 = require("afpl/lib/monad/Maybe");
/**
  * visible queries whether the Hidable is visible or not.
  *
  * It retrieves an HTMLElement by id and checks whether
  * it does not have a hidden class.
  */
exports.isVisible = function (fn) { return function () {
    return fn()
        .map(function (e) { return e.classList.contains(names.HIDDEN); })
        .orJust(function () { return false; })
        .get();
}; };
/**
 * hide the Hidable.
 *
 * This is acheived by adding a 'hidden' class name
 * to an HTMLElement retrieved by id.
 */
exports.hide = function (h) { return function (fn) { return function () {
    return Maybe_1.Maybe
        .fromBoolean(h.isVisible())
        .chain(fn)
        .map(function (e) { return e.classList.add(names.HIDDEN); })
        .map(function () { return h; })
        .orJust(function () { return h; })
        .get();
}; }; };
/**
 * show the Hidable
 *
 * This is acheived by removing a 'hidden' class name
 * to an HTMLElement retrieved by id.
 */
exports.show = function (h) { return function (fn) { return function () {
    return Maybe_1.Maybe
        .fromBoolean(h.isVisible())
        .orElse(function () { return fn().map(function (e) { return e.classList.remove(names.HIDDEN); }); })
        .map(function () { return h; })
        .orJust(function () { return h; })
        .get();
}; }; };
/**
 * toggle the visibility of the Hidable.
 */
exports.toggle = function (h) { return function (fn) { return function () {
    return fn()
        .map(function (e) { return e.classList.toggle(names.HIDDEN); })
        .map(function () { return h; })
        .orJust(function () { return h; })
        .get();
}; }; };
//# sourceMappingURL=index.js.map