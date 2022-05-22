"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
var __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var grid_1 = require("../../../../../lib/layout/grid");
;
var text_input_1 = require("../../../../../lib/control/text-input");
;
var ranged_pager_1 = require("../../../../../lib/control/ranged-pager");
;
var button_1 = require("../../../../../lib/control/button");
;
var size_1 = require("../../../../../lib/content/size");
;
var demo_1 = require("../../widgets/demo");
;
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
var unsafe = __document.unsafe;
// @ts-ignore 6192
var isSet = function (value) { return value != null; };
var Main = /** @class */ (function () {
    function Main(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = function (__this) {
            return __this.widget(new demo_1.Demo({}, [
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({}, [
                        __this.node('h3', {}, [
                            __document.createTextNode('Use the controls below to configure attributes.')
                        ]),
                        __this.node('p', {}, [
                            __document.createTextNode('\u000a        Max: \u000a        \u000a        '),
                            __this.widget(new text_input_1.TextInput({ ww: { 'size': size_1.Size.Small, 'name': 'max', 'value': String(__context.values.max), 'onChange': __context.values.onAttrChange } }, []), { ww: { 'size': size_1.Size.Small, 'name': 'max', 'value': String(__context.values.max), 'onChange': __context.values.onAttrChange } }),
                            __document.createTextNode('\u000a\u000a        Total:\u000a\u000a        '),
                            __this.widget(new text_input_1.TextInput({ ww: { 'size': size_1.Size.Small, 'name': 'total', 'value': String(__context.values.total), 'onChange': __context.values.onAttrChange } }, []), { ww: { 'size': size_1.Size.Small, 'name': 'total', 'value': String(__context.values.total), 'onChange': __context.values.onAttrChange } }),
                            __document.createTextNode('\u000a\u000a        Current:\u000a\u000a        '),
                            __this.widget(new text_input_1.TextInput({ ww: { 'size': size_1.Size.Small, 'name': 'current', 'value': String(__context.values.current), 'onChange': __context.values.onAttrChange } }, []), { ww: { 'size': size_1.Size.Small, 'name': 'current', 'value': String(__context.values.current), 'onChange': __context.values.onAttrChange } }),
                            __this.widget(new button_1.Button({ ww: { 'text': 'Go', 'onClick': __context.values.reset } }, []), { ww: { 'text': 'Go', 'onClick': __context.values.reset } })
                        ])
                    ]), {})
                ]), {}),
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({}, [
                        __this.node('p', {}, [
                            text(__context.values.message)
                        ])
                    ]), {})
                ]), {}),
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({}, [
                        __this.widget(new ranged_pager_1.RangedPager({ 'max': __context.values.max, 'total': __context.values.total, 'current': __context.values.current, 'onChange': __context.values.onChange }, []), { 'max': __context.values.max, 'total': __context.values.total, 'current': __context.values.current, 'onChange': __context.values.onChange })
                    ]), {})
                ]), {})
            ]), {});
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
            else if (!__document.isBrowser &&
                value instanceof __document.WMLDOMText) {
                e.setAttribute(key, value);
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
//# sourceMappingURL=views.js.map