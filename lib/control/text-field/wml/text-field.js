"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("../../../");
;
var wml_1 = require("../../wml");
;
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
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
exports.input = function (t) { return function (__this) {
    return [
        __this.node('input', { html: { 'name': t.values.control.name, 'type': t.values.control.type, 'focus': t.values.control.focus, 'placeholder': t.values.control.placeholder, 'oninput': t.values.control.oninput, 'value': t.values.control.value, 'disabled': t.values.control.disabled, 'readonly': t.values.control.readOnly }, wml: { 'id': t.values.control.wml.id } }, [])
    ];
}; };
;
exports.textarea = function (t) { return function (__this) {
    return [
        __this.node('textarea', { html: { 'name': t.values.control.name, 'placeholder': t.values.control.placeholder, 'oninput': t.values.control.oninput, 'disabled': t.values.control.disabled, 'readonly': t.values.control.readOnly, 'rows': t.values.control.rows }, wml: { 'id': t.values.control.wml.id } }, [
            __1.textNode(t.values.control.value)
        ])
    ];
}; };
;
exports.control = function (t) { return function (__this) {
    return (__if((t.values.control.rows === 1), function () { return ((exports.input(t)(__this)).slice()); }, function () { return ((exports.textarea(t)(__this)).slice()); })).slice();
}; };
;
exports.group = function (t) { return function (__this) {
    return (wml_1.label(t.values.label.id)(t.values.label.text)(__this)).concat((exports.control(t)(__this)), (wml_1.message(t.values.messages.wml.id)({})(__this)));
}; };
;
var Main = /** @class */ (function () {
    function Main(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.node('div', { html: { 'class': __context.values.root.className }, wml: { 'id': __context.values.root.id } }, (__context.values.control.template()(__context)(__this)).slice());
        };
    }
    Main.prototype.register = function (e, attrs) {
        var id = attrs.wml.id;
        var group = attrs.wml.group;
        if (id != null) {
            if (this.ids.hasOwnProperty(id))
                throw new Error("Duplicate id '" + id + "' detected!");
            this.ids[id] = e;
        }
        if (group != null) {
            this.groups[group] = this.groups[group] || [];
            this.groups[group].push(e);
        }
        return e;
    };
    Main.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        if (typeof attrs['html'] === 'object')
            Object.keys(attrs['html']).forEach(function (key) {
                var value = attrs['html'][key];
                if (typeof value === 'function') {
                    e[key] = value;
                }
                else if (typeof value === 'string') {
                    //prevent setting things like disabled=''
                    if (value !== '')
                        e.setAttribute(key, value);
                }
                else if (typeof value === 'boolean') {
                    e.setAttribute(key, "" + value);
                }
            });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    Main.prototype.widget = function (C, attrs, children) {
        var w = new C(attrs, children);
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Main.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Main.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Main.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new Error('Cannot invalidate a view  that has not been rendered!');
        parent.replaceChild(this.render(), tree);
    };
    Main.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return Main;
}());
exports.Main = Main;
//# sourceMappingURL=text-field.js.map