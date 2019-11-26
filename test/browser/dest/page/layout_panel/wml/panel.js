"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var grid_1 = require("../../../../../../lib/layout/grid");
;
var panel_1 = require("../../../../../../lib/layout/panel");
;
var style_1 = require("../../../../../../lib/content/style");
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
            return __this.widget(new grid_1.GridLayout({}, __spreadArrays(__forIn(style_1.styles, function (style, _$$i, _$$all) {
                return ([
                    __this.widget(new grid_1.Row({}, [
                        __this.widget(new grid_1.Column({ ww: { 'span': 4 } }, [
                            __this.widget(new panel_1.Panel({ ww: { 'style': style } }, [
                                __this.widget(new panel_1.PanelBody({}, [
                                    document.createTextNode("\n            PanelBody only.\n          ")
                                ]), {})
                            ]), { ww: { 'style': style } })
                        ]), { ww: { 'span': 4 } }),
                        __this.widget(new grid_1.Column({ ww: { 'span': 4 } }, [
                            __this.widget(new panel_1.Panel({ ww: { 'style': style } }, [
                                __this.widget(new panel_1.PanelHeader({}, [
                                    document.createTextNode("\n            With PanelHeader\n          ")
                                ]), {}),
                                __this.widget(new panel_1.PanelBody({}, [
                                    document.createTextNode("\n            Lorem impsum dilium net set.\n          ")
                                ]), {})
                            ]), { ww: { 'style': style } })
                        ]), { ww: { 'span': 4 } }),
                        __this.widget(new grid_1.Column({ ww: { 'span': 4 } }, [
                            __this.widget(new panel_1.Panel({ ww: { 'style': style } }, [
                                __this.widget(new panel_1.PanelHeader({}, [
                                    document.createTextNode("With PanelFooter")
                                ]), {}),
                                __this.widget(new panel_1.PanelBody({}, [
                                    document.createTextNode("Lorem impsum dilium net set.")
                                ]), {}),
                                __this.widget(new panel_1.PanelFooter({}, [
                                    document.createTextNode("Meh foot.")
                                ]), {})
                            ]), { ww: { 'style': style } })
                        ]), { ww: { 'span': 4 } })
                    ]), {})
                ]);
            }, function () { return ([]); }))), {});
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
//# sourceMappingURL=panel.js.map