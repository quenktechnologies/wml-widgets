"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassName = exports.getId = void 0;
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
    var asHtmlAttrs = attrs;
    var asWidgetAttrs = attrs.ww;
    return asHtmlAttrs.className ||
        (asWidgetAttrs && asWidgetAttrs.className) || '';
};
//# sourceMappingURL=index.js.map