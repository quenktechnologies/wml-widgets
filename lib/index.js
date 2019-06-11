"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * getId from a widget's passed attributes.
 */
exports.getId = function (attrs) {
    return (attrs.ww && attrs.ww.id) ? attrs.ww.id : '';
};
/**
 * getClassName from a widget's passed attributes.
 */
exports.getClassName = function (attrs) {
    return (attrs.ww && attrs.ww.className) ? attrs.ww.className : '';
};
/**
 * text constructor.
 */
exports.text = function (str) {
    return document.createTextNode(String((str == null) ? '' : str));
};
//# sourceMappingURL=index.js.map