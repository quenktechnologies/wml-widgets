"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var demo_1 = require("../../../widgets/demo");
;
var text_field_1 = require("../../../../../../lib/control/text-field");
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
            return __this.widget(demo_1.Demo, { html: {}, wml: {} }, [
                __this.widget(demo_1.Demo, { html: {}, wml: {} }, [
                    __this.node('p', { html: {}, wml: {} }, [
                        document.createTextNode("The value of the input is:")
                    ]),
                    __this.node('p', { html: {}, wml: { 'id': "content" } }, [
                        document.createTextNode("Nothing")
                    ]),
                    __this.node('p', { html: {}, wml: {} }, [
                        __this.widget(text_field_1.TextField, { html: {}, wml: { 'id': "text" }, ww: { 'name': "text", 'onChange': __context.onChange } }, [])
                    ])
                ]),
                __this.widget(demo_1.Demo, { html: {}, wml: {} }, [
                    __this.node('p', { html: {}, wml: {} }, [
                        __this.node('strong', { html: {}, wml: {} }, [
                            document.createTextNode("Success")
                        ])
                    ]),
                    __this.node('p', { html: {}, wml: {} }, [
                        __this.widget(text_field_1.TextField, { html: {}, wml: {}, ww: { 'name': "text", 'success': "This textfield has a success", 'onChange': __context.onChange } }, [])
                    ])
                ]),
                __this.widget(demo_1.Demo, { html: {}, wml: {} }, [
                    __this.node('p', { html: {}, wml: {} }, [
                        __this.node('strong', { html: {}, wml: {} }, [
                            document.createTextNode("Warning")
                        ])
                    ]),
                    __this.node('p', { html: {}, wml: {} }, [
                        __this.widget(text_field_1.TextField, { html: {}, wml: {}, ww: { 'name': "text", 'warning': "This textfield has a warning.", 'onChange': __context.onChange } }, [])
                    ])
                ]),
                __this.widget(demo_1.Demo, { html: {}, wml: {} }, [
                    __this.node('p', { html: {}, wml: {} }, [
                        __this.node('strong', { html: {}, wml: {} }, [
                            document.createTextNode("Error")
                        ])
                    ]),
                    __this.node('p', { html: {}, wml: {} }, [
                        __this.widget(text_field_1.TextField, { html: {}, wml: {}, ww: { 'name': "text", 'error': "This textfield has an error.", 'onChange': __context.onChange } }, [])
                    ])
                ]),
                __this.widget(demo_1.Demo, { html: {}, wml: {} }, [
                    __this.node('p', { html: {}, wml: {} }, [
                        document.createTextNode("The one uses rows to render a text area:")
                    ]),
                    __this.node('p', { html: {}, wml: {} }, [
                        __this.widget(text_field_1.TextField, { html: {}, wml: {}, ww: { 'name': "text", 'rows': 3, 'onChange': __context.onChange } }, [])
                    ])
                ])
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