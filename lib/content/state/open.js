"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.open = exports.OPEN = void 0;
///classNames:begin
/**
 * OPEN state.
 */
exports.OPEN = '-open';
/**
 * open the widget.
 */
var open = function (w) { return function (fn) { return function () {
    return fn()
        .map(function (e) { return e.classList.add(exports.OPEN); })
        .map(function () { return w; })
        .orJust(function () { return w; })
        .get();
}; }; };
exports.open = open;
/**
 * close this widget.
 */
var close = function (w) { return function (fn) { return function () {
    return fn()
        .map(function (e) { return e.classList.remove(exports.OPEN); })
        .map(function () { return w; })
        .orJust(function () { return w; })
        .get();
}; }; };
exports.close = close;
//# sourceMappingURL=open.js.map