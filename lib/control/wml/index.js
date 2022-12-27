"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.message = exports.label = void 0;
const __document = require("@quenk/wml/lib/dom");
//@ts-ignore:6192
const __if = (__expr, __conseq, __alt) => (__expr) ? __conseq() : __alt ? __alt() : [];
//@ts-ignore:6192
const __forIn = (list, f, alt) => {
    let ret = [];
    for (let i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
//@ts-ignore:6192
const __forOf = (o, f, alt) => {
    let ret = [];
    for (let key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
// @ts-ignore 6192
const text = __document.text;
// @ts-ignore 6192
const unsafe = __document.unsafe;
// @ts-ignore 6192
const isSet = (value) => value != null;
const label = (id, t) => (__this) => {
    return [
        __this.node('label', { 'for': id, 'class': "control-label" }, [
            text(t)
        ])
    ];
};
exports.label = label;
;
const message = (_id, _m) => (__this) => {
    return [
        __this.node('span', { 'class': "help-block" }, [])
    ];
};
exports.message = message;
//# sourceMappingURL=index.js.map