"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var search_1 = require("../../search");
;
var label_1 = require("../../label");
;
var help_1 = require("../../help");
;
var tag_1 = require("../../tag");
;
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
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
var Main = /** @class */ (function () {
    function Main(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.node('div', { 'id': __context.values.root.id, 'class': __context.values.root.className }, __spreadArrays([
                __this.widget(new label_1.Label({ ww: { 'for': __context.values.root.id, 'text': __context.values.label.text } }, []), { ww: { 'for': __context.values.root.id, 'text': __context.values.label.text } })
            ], (__if(__context.values.tag.isSet(), function () { return ([
                __this.widget(new tag_1.Tag({ ww: { 'text': __context.values.tag.getText(), 'className': __context.values.tag.className, 'disabled': __context.values.tag.disabled, 'onDismiss': __context.values.tag.dismiss } }, []), { ww: { 'text': __context.values.tag.getText(), 'className': __context.values.tag.className, 'disabled': __context.values.tag.disabled, 'onDismiss': __context.values.tag.dismiss } })
            ]); }, function () { return ([
                __this.widget(new search_1.Search({ wml: { 'id': __context.values.search.wml.id }, ww: { 'name': __context.values.search.name, 'className': __context.values.search.className, 'block': __context.values.search.block, 'placeholder': __context.values.search.placeholder, 'readOnly': __context.values.search.readOnly, 'disabled': __context.values.search.disabled, 'itemTemplate': __context.values.search.itemTemplate, 'noItemsTemplate': __context.values.search.noItemsTemplate, 'stringifier': __context.values.search.stringifier, 'onSearch': __context.values.search.onSearch, 'onSelect': __context.values.search.onSelect } }, []), { wml: { 'id': __context.values.search.wml.id }, ww: { 'name': __context.values.search.name, 'className': __context.values.search.className, 'block': __context.values.search.block, 'placeholder': __context.values.search.placeholder, 'readOnly': __context.values.search.readOnly, 'disabled': __context.values.search.disabled, 'itemTemplate': __context.values.search.itemTemplate, 'noItemsTemplate': __context.values.search.noItemsTemplate, 'stringifier': __context.values.search.stringifier, 'onSearch': __context.values.search.onSearch, 'onSelect': __context.values.search.onSelect } })
            ]); })), [
                __this.widget(new help_1.Help({ wml: { 'id': __context.values.messages.wml.id }, ww: { 'text': __context.values.messages.text } }, []), { wml: { 'id': __context.values.messages.wml.id }, ww: { 'text': __context.values.messages.text } })
            ]));
        };
    }
    Main.prototype.registerView = function (v) {
        this.views.push(v);
        return v;
    };
    Main.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    Main.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
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
    Main.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Main.prototype.findById = function (id) {
        var mW = maybe_1.fromNullable(this.ids[id]);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findById(id);
        }, mW);
    };
    Main.prototype.findByGroup = function (name) {
        var mGroup = maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findByGroup(name);
        }, mGroup);
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
        this.views = [];
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
//# sourceMappingURL=select.js.map