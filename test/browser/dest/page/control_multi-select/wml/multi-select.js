"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
var __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var demo_1 = require("../../../widgets/demo");
;
var multi_select_1 = require("../../../../../../lib/control/multi-select");
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
                __this.widget(new demo_1.Demo({}, [
                    __this.widget(new multi_select_1.MultiSelect({ wml: { 'id': __context.values.normal.id }, ww: { 'name': __context.values.normal.name, 'label': __context.values.normal.label, 'stringifier': __context.values.normal.stringifier, 'onSearch': __context.values.normal.onSearch, 'onChange': __context.values.normal.onChange } }, []), { wml: { 'id': __context.values.normal.id }, ww: { 'name': __context.values.normal.name, 'label': __context.values.normal.label, 'stringifier': __context.values.normal.stringifier, 'onSearch': __context.values.normal.onSearch, 'onChange': __context.values.normal.onChange } })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.widget(new multi_select_1.MultiSelect({ wml: { 'id': __context.values.success.id }, ww: { 'name': __context.values.success.name, 'label': __context.values.success.label, 'success': __context.values.success.message, 'stringifier': __context.values.success.stringifier, 'onSearch': __context.values.success.onSearch, 'onChange': __context.values.success.onChange } }, []), { wml: { 'id': __context.values.success.id }, ww: { 'name': __context.values.success.name, 'label': __context.values.success.label, 'success': __context.values.success.message, 'stringifier': __context.values.success.stringifier, 'onSearch': __context.values.success.onSearch, 'onChange': __context.values.success.onChange } })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.widget(new multi_select_1.MultiSelect({ wml: { 'id': __context.values.warning.id }, ww: { 'name': __context.values.warning.name, 'label': __context.values.warning.label, 'warning': __context.values.warning.message, 'stringifier': __context.values.warning.stringifier, 'onSearch': __context.values.warning.onSearch, 'onChange': __context.values.warning.onChange } }, []), { wml: { 'id': __context.values.warning.id }, ww: { 'name': __context.values.warning.name, 'label': __context.values.warning.label, 'warning': __context.values.warning.message, 'stringifier': __context.values.warning.stringifier, 'onSearch': __context.values.warning.onSearch, 'onChange': __context.values.warning.onChange } })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.widget(new multi_select_1.MultiSelect({ wml: { 'id': __context.values.error.id }, ww: { 'name': __context.values.error.name, 'label': __context.values.error.label, 'error': __context.values.error.message, 'stringifier': __context.values.error.stringifier, 'onSearch': __context.values.error.onSearch, 'onChange': __context.values.error.onChange } }, []), { wml: { 'id': __context.values.error.id }, ww: { 'name': __context.values.error.name, 'label': __context.values.error.label, 'error': __context.values.error.message, 'stringifier': __context.values.error.stringifier, 'onSearch': __context.values.error.onSearch, 'onChange': __context.values.error.onChange } })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.widget(new multi_select_1.MultiSelect({ wml: { 'id': __context.values.block.id }, ww: { 'name': __context.values.block.name, 'label': __context.values.block.label, 'block': true, 'stringifier': __context.values.block.stringifier, 'onSearch': __context.values.block.onSearch, 'onChange': __context.values.block.onChange } }, []), { wml: { 'id': __context.values.block.id }, ww: { 'name': __context.values.block.name, 'label': __context.values.block.label, 'block': true, 'stringifier': __context.values.block.stringifier, 'onSearch': __context.values.block.onSearch, 'onChange': __context.values.block.onChange } })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.widget(new multi_select_1.MultiSelect({ ww: { 'name': __context.values.normal.name, 'label': 'Disabled', 'disabled': true, 'onSearch': __context.values.normal.onSearch, 'onChange': __context.values.normal.onChange } }, []), { ww: { 'name': __context.values.normal.name, 'label': 'Disabled', 'disabled': true, 'onSearch': __context.values.normal.onSearch, 'onChange': __context.values.normal.onChange } })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.widget(new multi_select_1.MultiSelect({ ww: { 'name': __context.values.init.name, 'label': 'Initialized', 'value': __context.values.init.value, 'stringifier': __context.values.init.stringifier, 'onSearch': __context.values.init.onSearch, 'onChange': __context.values.init.onChange } }, []), { ww: { 'name': __context.values.init.name, 'label': 'Initialized', 'value': __context.values.init.value, 'stringifier': __context.values.init.stringifier, 'onSearch': __context.values.init.onSearch, 'onChange': __context.values.init.onChange } })
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
//# sourceMappingURL=multi-select.js.map