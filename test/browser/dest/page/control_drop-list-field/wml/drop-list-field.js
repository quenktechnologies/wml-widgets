"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var demo_1 = require("../../../widgets/demo");
;
var drop_list_field_1 = require("../../../../../../lib/control/drop-list-field");
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
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.widget(new demo_1.Demo({}, [
                __this.widget(new demo_1.Demo({}, [
                    __this.node('b', {}, [
                        document.createTextNode("Normal")
                    ]),
                    __this.node('p', {}, [
                        __this.widget(new drop_list_field_1.DropListField({ wml: { 'id': __context.values.normal.name }, ww: { 'name': __context.values.normal.name, 'value': __context.values.normal.value, 'options': __context.values.normal.options, 'onChange': __context.values.normal.onChange } }, []), { wml: { 'id': __context.values.normal.name }, ww: { 'name': __context.values.normal.name, 'value': __context.values.normal.value, 'options': __context.values.normal.options, 'onChange': __context.values.normal.onChange } })
                    ])
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('b', {}, [
                        document.createTextNode("Success")
                    ]),
                    __this.node('p', {}, [
                        __this.widget(new drop_list_field_1.DropListField({ wml: { 'id': __context.values.success.id }, ww: { 'className': '-success', 'name': __context.values.success.name, 'options': __context.values.success.options, 'onChange': __context.values.success.onChange } }, []), { wml: { 'id': __context.values.success.id }, ww: { 'className': '-success', 'name': __context.values.success.name, 'options': __context.values.success.options, 'onChange': __context.values.success.onChange } })
                    ])
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('b', {}, [
                        document.createTextNode("Warning")
                    ]),
                    __this.node('p', {}, [
                        __this.widget(new drop_list_field_1.DropListField({ wml: { 'id': __context.values.warning.id }, ww: { 'className': '-warning', 'name': __context.values.warning.name, 'options': __context.values.warning.options, 'onChange': __context.values.warning.onChange } }, []), { wml: { 'id': __context.values.warning.id }, ww: { 'className': '-warning', 'name': __context.values.warning.name, 'options': __context.values.warning.options, 'onChange': __context.values.warning.onChange } })
                    ])
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('b', {}, [
                        document.createTextNode("Error")
                    ]),
                    __this.node('p', {}, [
                        __this.widget(new drop_list_field_1.DropListField({ wml: { 'id': __context.values.error.id }, ww: { 'className': '-error', 'name': __context.values.error.name, 'options': __context.values.error.options, 'onChange': __context.values.error.onChange } }, []), { wml: { 'id': __context.values.error.id }, ww: { 'className': '-error', 'name': __context.values.error.name, 'options': __context.values.error.options, 'onChange': __context.values.error.onChange } })
                    ])
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('b', {}, [
                        document.createTextNode("Disabled")
                    ]),
                    __this.node('p', {}, [
                        __this.widget(new drop_list_field_1.DropListField({ ww: { 'name': __context.values.normal.name, 'value': __context.values.normal.value, 'options': __context.values.normal.options, 'disabled': true, 'onChange': __context.values.normal.onChange } }, []), { ww: { 'name': __context.values.normal.name, 'value': __context.values.normal.value, 'options': __context.values.normal.options, 'disabled': true, 'onChange': __context.values.normal.onChange } })
                    ])
                ]), {})
            ]), {});
        };
    }
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
//# sourceMappingURL=drop-list-field.js.map