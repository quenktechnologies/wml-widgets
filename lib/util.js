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
const getById = (view, id) => {
    let m = view.findById(id);
    if (m.isNothing()) {
        (0, exports.warnMissing)(view, id);
    }
    return m;
};
exports.getById = getById;
/**
 * warn via console that an element is missing.
 */
const warnMissing = (view, id) => {
    console.warn('The view ', view, ` does not have an id "${id}"!`);
};
exports.warnMissing = warnMissing;
/**
 * combine the members of an array into one string.
 */
const combine = (str, joiner = ' ') => str.filter(s => ((s != null) || s != '')).join(joiner);
exports.combine = combine;
/**
 * concat joins various strings together to form an html class attribute value.
 *
 * Removes empty strings, null and undefined values.
 */
const concat = (...str) => str.filter(s => ((s == null) || (s == '')) ? false : true)
    .map(s => s.trim()).join(' ');
exports.concat = concat;
/**
 * noop
 */
const noop = () => { };
exports.noop = noop;
/**
 * replaceContent
 */
const replaceContent = (r, node) => {
    while (node.lastChild)
        node.removeChild(node.lastChild);
    node.appendChild(r.render());
};
exports.replaceContent = replaceContent;
/**
 * debounce a function so that it is only called once after
 * a period of time.
 */
const debounce = (f, delay) => {
    let timer = -1;
    return delay === 0 ? f : (a) => {
        if (timer === -1) {
            timer = window.setTimeout(() => f(a), delay);
        }
        else {
            clearTimeout(timer);
            timer = window.setTimeout(() => f(a), delay);
        }
    };
};
exports.debounce = debounce;
//# sourceMappingURL=util.js.map