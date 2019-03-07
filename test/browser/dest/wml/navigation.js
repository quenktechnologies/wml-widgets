"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
var nav_1 = require("../../../../lib/menu/nav");
;
var item_1 = require("../../../../lib/menu/item");
;
var header_1 = require("../../../../lib/menu/header");
;
var link_1 = require("../../../../lib/content/link");
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
var Navigation = /** @class */ (function () {
    function Navigation(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.widget(nav_1.Nav, { html: {}, wml: {}, ww: { 'vertical': true } }, [
                __this.widget(item_1.Item, { html: {}, wml: {} }, [
                    __this.widget(link_1.Link, { html: {}, wml: { 'group': "links" }, ww: { 'active': (__context.page === "home"), 'name': "home", 'href': "#", 'onClick': __context.navigate, 'text': "Home" } }, [])
                ])
            ].concat(__forOf(__context.pages, function (items, section, _$$all) {
                return ([
                    __this.widget(item_1.Item, { html: {}, wml: {} }, [
                        __this.widget(header_1.MenuHeader, { html: {}, wml: {}, ww: { 'text': section } }, []),
                        __this.widget(nav_1.Nav, { html: {}, wml: {}, ww: { 'vertical': true } }, __forOf(items, function (_, name, _$$all) {
                            return ([
                                __this.widget(item_1.Item, { html: {}, wml: {} }, [
                                    __this.widget(link_1.Link, { html: {}, wml: { 'group': "links" }, ww: { 'name': name, 'href': ("#/" + name), 'onClick': __context.navigate, 'active': (__context.page === name), 'text': name } }, [])
                                ])
                            ]);
                        }, function () { return ([]); }).slice())
                    ])
                ]);
            }, function () { return ([]); })));
        };
    }
    Navigation.prototype.register = function (e, attrs) {
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
    Navigation.prototype.node = function (tag, attrs, children) {
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
    Navigation.prototype.widget = function (C, attrs, children) {
        var w = new C(attrs, children);
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    Navigation.prototype.findById = function (id) {
        return maybe_1.fromNullable(this.ids[id]);
    };
    Navigation.prototype.findByGroup = function (name) {
        return maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
    };
    Navigation.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Cannot invalidate a view that has not been rendered!');
        if (tree.parentNode == null)
            throw new Error('Cannot invalidate a view  that has not been rendered!');
        parent.replaceChild(this.render(), tree);
    };
    Navigation.prototype.render = function () {
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
    return Navigation;
}());
exports.Navigation = Navigation;
//# sourceMappingURL=navigation.js.map