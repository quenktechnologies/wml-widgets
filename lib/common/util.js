"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    return str.filter(function (s) { return ((s != null) || s != ''); }).join(' ');
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
    var timer = null;
    return delay === 0 ? f : function (a) {
        if (!timer) {
            timer = setTimeout(function () { return f(a); }, delay);
        }
        else {
            clearTimeout(timer);
            timer = setTimeout(function () { return f(a); }, delay);
        }
    };
};
//# sourceMappingURL=util.js.map