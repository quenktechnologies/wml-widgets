"use strict";
/**
 * This module provides utility functions and constants used
 * through out the wml-widgets module.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = exports.replaceContent = exports.noop = exports.concat = exports.combine = exports.warnMissing = exports.getById = void 0;
/**
 * getById retreives an WMLElement from a view by its id.
 *
 * If the WMLElement is not found a warning is logged to console.
 */
exports.getById = function (view, id) {
    var m = view.findById(id);
    if (m.isNothing()) {
        exports.warnMissing(view, id);
    }
    return m;
};
/**
 * warn via console that an element is missing.
 */
exports.warnMissing = function (view, id) {
    console.warn('The view ', view, " does not have an id \"" + id + "\"!");
};
/**
 * combine the members of an array into one string.
 */
exports.combine = function (str, joiner) {
    if (joiner === void 0) { joiner = ' '; }
    return str.filter(function (s) { return ((s != null) || s != ''); }).join(joiner);
};
/**
 * concat joins various strings together to form an html class attribute value.
 *
 * Removes empty strings, null and undefined values.
 */
exports.concat = function () {
    var str = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        str[_i] = arguments[_i];
    }
    return str.filter(function (s) { return ((s == null) || (s == '')) ? false : true; })
        .map(function (s) { return s.trim(); }).join(' ');
};
/**
 * noop
 */
exports.noop = function () { };
/**
 * replaceContent
 */
exports.replaceContent = function (r, node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
    node.appendChild(r.render());
};
/**
 * debounce a function so that it is only called once after
 * a period of time.
 */
exports.debounce = function (f, delay) {
    var timer = -1;
    return delay === 0 ? f : function (a) {
        if (timer === -1) {
            timer = window.setTimeout(function () { return f(a); }, delay);
        }
        else {
            clearTimeout(timer);
            timer = window.setTimeout(function () { return f(a); }, delay);
        }
    };
};
//# sourceMappingURL=util.js.map