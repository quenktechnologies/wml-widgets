"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
var __1 = require("../../");
//@ts-ignore:6192
var __if = function (__expr, __conseq, __alt) {
    return (__expr) ? __conseq() : __alt();
};
//@ts-ignore:6192
var __forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
//@ts-ignore:6192
var __forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
exports.label = function (id) { return function (t) { return function (__this) {
    return [
        __this.node('label', { html: { 'for': id, 'class': "control-label" }, wml: {} }, [
            __1.text(t)
        ])
    ];
}; }; };
;
exports.message = function (_id) { return function (_m) { return function (__this) {
    return [
        __this.node('span', { html: { 'class': "help-block" }, wml: {} }, [])
    ];
}; }; };
//# sourceMappingURL=index.js.map