"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var label_1 = require("../../label");
;
var help_1 = require("../../help");
;
var __1 = require("../../../");
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
var Main = /** @class */ (function () {
    function Main(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.node('div', { html: { 'id': __context.values.root.id, 'class': __context.values.root.className }, wml: {} }, (__if((__context.values.label.text !== null), function () { return ([
                __this.widget(label_1.Label, { html: {}, wml: {}, ww: { 'for': __context.values.control.id, 'text': __context.values.label.text } }, [])
            ]); }, function () { return ([
                __1.text("")
            ]); })).concat([
                __this.node('input', { html: { 'name': __context.values.day.wml.id, 'oninput': __context.values.day.oninput, 'onkeyup': __context.values.day.onkeyup, 'type': "number", 'value': __context.values.day.value, 'disabled': __context.values.day.disabled, 'class': __context.values.day.className, 'min': "1", 'max': "31", 'size': "2", 'placeholder': "DD" }, wml: { 'id': __context.values.day.wml.id } }, []),
                __this.node('input', { html: { 'name': __context.values.month.wml.id, 'class': __context.values.month.className, 'oninput': __context.values.month.oninput, 'onkeyup': __context.values.month.onkeyup, 'type': "number", 'disabled': __context.values.month.disabled, 'value': __context.values.month.value, 'min': "1", 'max': "12", 'size': "2", 'placeholder': "MM" }, wml: { 'id': __context.values.month.wml.id } }, []),
                __this.node('input', { html: { 'name': __context.values.year.wml.id, 'type': "number", 'oninput': __context.values.year.oninput, 'onkeyup': __context.values.year.onkeyup, 'value': __context.values.year.value, 'disabled': __context.values.year.disabled, 'class': __context.values.year.className, 'placeholder': "YYYY", 'min': "0000", 'max': "9999", 'size': "4" }, wml: { 'id': __context.values.year.wml.id } }, []),
                __this.widget(help_1.Help, { html: {}, wml: { 'id': __context.values.messages.wml.id }, ww: { 'text': __context.values.messages.text } }, [])
            ]));
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
//# sourceMappingURL=date-field.js.map