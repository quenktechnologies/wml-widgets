"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = exports.label = void 0;
var __document = require("@quenk/wml/lib/dom");
//@ts-ignore:6192
var __if = function (__expr, __conseq, __alt) {
    return (__expr) ? __conseq() : __alt ? __alt() : [];
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
// @ts-ignore 6192
var text = __document.text;
// @ts-ignore 6192
var isSet = function (value) { return value != null; };
exports.label = function (id, t) { return function (__this) {
    return [
        __this.node('label', { 'for': id, 'class': 'control-label' }, [
            text(t)
        ])
    ];
}; };
;
exports.message = function (_id, _m) { return function (__this) {
    return [
        __this.node('span', { 'class': 'help-block' }, [])
    ];
}; };
//# sourceMappingURL=index.js.map