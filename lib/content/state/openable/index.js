"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var names = require("./classNames");
/**
 * open the widget.
 */
exports.open = function (w) { return function (fn) { return function () {
    return fn()
        .map(function (e) { return e.classList.add(names.OPEN); })
        .map(function () { return w; })
        .orJust(function () { return w; })
        .get();
}; }; };
/**
 * close this widget.
 */
exports.close = function (w) { return function (fn) { return function () {
    return fn()
        .map(function (e) { return e.classList.remove(names.OPEN); })
        .map(function () { return w; })
        .orJust(function () { return w; })
        .get();
}; }; };
//# sourceMappingURL=index.js.map