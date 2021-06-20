"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navigation = void 0;
var __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
;
var nav_1 = require("../../../../lib/menu/nav");
;
var item_1 = require("../../../../lib/menu/item");
;
var header_1 = require("../../../../lib/menu/header");
;
var link_1 = require("../../../../lib/content/link");
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
var Navigation = /** @class */ (function () {
    function Navigation(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = function (__this) {
            return __this.widget(new nav_1.Nav({ ww: { 'vertical': true } }, __spreadArrays([
                __this.widget(new item_1.Item({}, [
                    __this.widget(new link_1.Link({ wml: { 'group': 'links' }, ww: { 'active': (__context.page === 'home'), 'name': 'home', 'href': '#', 'onClick': __context.navigate, 'text': 'Home' } }, []), { wml: { 'group': 'links' }, ww: { 'active': (__context.page === 'home'), 'name': 'home', 'href': '#', 'onClick': __context.navigate, 'text': 'Home' } })
                ]), {})
            ], __forOf(__context.pages, function (items, section, _$$all) {
                return ([
                    __this.widget(new item_1.Item({}, [
                        __this.widget(new header_1.MenuHeader({ ww: { 'text': section } }, []), { ww: { 'text': section } }),
                        __this.widget(new nav_1.Nav({ ww: { 'vertical': true } }, __spreadArrays(__forOf(items, function (_, name, _$$all) {
                            return ([
                                __this.widget(new item_1.Item({}, [
                                    __this.widget(new link_1.Link({ wml: { 'group': 'links' }, ww: { 'name': name, 'href': ('#/' + name), 'onClick': __context.navigate, 'active': (__context.page === name), 'text': name } }, []), { wml: { 'group': 'links' }, ww: { 'name': name, 'href': ('#/' + name), 'onClick': __context.navigate, 'active': (__context.page === name), 'text': name } })
                                ]), {})
                            ]);
                        }, function () { return ([]); }))), { ww: { 'vertical': true } })
                    ]), {})
                ]);
            }, function () { return ([]); }))), { ww: { 'vertical': true } });
        };
    }
    Navigation.prototype.registerView = function (v) {
        this.views.push(v);
        return v;
    };
    Navigation.prototype.register = function (e, attrs) {
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
    Navigation.prototype.node = function (tag, attrs, children) {
        var e = __document.createElement(tag);
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
                e.setAttribute(key, '');
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = __document.createTextNode('' + c);
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
    Navigation.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Navigation.prototype.findById = function (id) {
        var mW = maybe_1.fromNullable(this.ids[id]);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findById(id);
        }, mW);
    };
    Navigation.prototype.findByGroup = function (name) {
        var mGroup = maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findByGroup(name);
        }, mGroup);
    };
    Navigation.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    Navigation.prototype.render = function () {
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
    return Navigation;
}());
exports.Navigation = Navigation;
//# sourceMappingURL=navigation.js.map