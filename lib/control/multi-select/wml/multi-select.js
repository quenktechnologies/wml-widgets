"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var label_1 = require("../../label");
;
var help_1 = require("../../help");
;
var tag_1 = require("../../tag");
;
var search_1 = require("../../search");
;
var results_menu_1 = require("../../results-menu");
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
            return __this.node('div', { html: { 'id': __context.values.root.id, 'class': __context.values.root.className }, wml: {} }, [
                __this.widget(label_1.Label, { html: {}, wml: {}, ww: { 'for': __context.values.root.id, 'text': __context.values.label.text } }, []),
                __this.node('div', { html: { 'onclick': __context.values.content.onfocus, 'class': __context.values.content.className }, wml: {} }, __spreadArrays((__if(__context.values.tags.has(), function () { return (__spreadArrays(__forIn(__context.values.tags.value, function (value, idx, _$$all) {
                    return ([
                        __this.widget(tag_1.Tag, { html: {}, wml: {}, ww: { 'name': String(idx), 'text': __context.values.tags.getText(value), 'className': __context.values.tags.className, 'onDismiss': __context.values.tags.onDismiss } }, [])
                    ]);
                }, function () { return ([]); }))); }, function () { return ([
                    __1.text("")
                ]); })), [
                    __this.widget(search_1.Input, { html: {}, wml: { 'id': __context.values.input.wml.id }, ww: { 'className': __context.values.input.className, 'name': __context.values.input.name, 'onSearch': __context.values.input.onSearch } }, [])
                ])),
                __this.widget(results_menu_1.ResultsMenu, { html: {}, wml: { 'id': __context.values.menu.wml.id }, ww: { 'block': __context.values.menu.block, 'onSelect': __context.values.menu.onSelect, 'noItemsTemplate': __context.values.menu.noItemsTemplate, 'itemsTemplate': __context.values.menu.itemTemplate, 'stringifier': __context.values.menu.stringifier } }, []),
                __this.widget(help_1.Help, { html: {}, wml: { 'id': __context.values.messages.wml.id }, ww: { 'text': __context.values.messages.text } }, [])
            ]);
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
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
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
//# sourceMappingURL=multi-select.js.map