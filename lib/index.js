"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassName = exports.getId = void 0;
/**
 * getId from a widget's passed attributes.
 */
const getId = (attrs) => attrs.id ? attrs.id : '';
exports.getId = getId;
/**
 * getClassName from a widget's passed attributes.
 *
 * Returns an empty string if the element has not className attribute.
 */
const getClassName = (attrs) => attrs.className || '';
exports.getClassName = getClassName;
//# sourceMappingURL=index.js.map