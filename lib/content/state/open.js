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
exports.open = function (w) { return function (fn) { return function () {
    return fn()
        .map(function (e) { return e.classList.add(exports.OPEN); })
        .map(function () { return w; })
        .orJust(function () { return w; })
        .get();
}; }; };
/**
 * close this widget.
 */
exports.close = function (w) { return function (fn) { return function () {
    return fn()
        .map(function (e) { return e.classList.remove(exports.OPEN); })
        .map(function () { return w; })
        .orJust(function () { return w; })
        .get();
}; }; };
//# sourceMappingURL=open.js.map