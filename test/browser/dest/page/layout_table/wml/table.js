"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var demo_1 = require("../../../widgets/demo");
;
var table_1 = require("../../../../../../lib/layout/table");
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
exports.content = function () { return function (__this) {
    return [
        __this.widget(table_1.TableHeader, { html: {}, wml: {} }, [
            __this.widget(table_1.TableRow, { html: {}, wml: {} }, [
                __this.widget(table_1.TableHeading, { html: {}, wml: {} }, [
                    document.createTextNode("Name")
                ]),
                __this.widget(table_1.TableHeading, { html: {}, wml: {} }, [
                    document.createTextNode("Email")
                ]),
                __this.widget(table_1.TableHeading, { html: {}, wml: {} }, [
                    document.createTextNode("Balance")
                ]),
                __this.widget(table_1.TableHeading, { html: {}, wml: {} }, [
                    document.createTextNode("Username")
                ]),
                __this.widget(table_1.TableHeading, { html: {}, wml: {} }, [
                    document.createTextNode("Status")
                ])
            ])
        ]),
        __this.widget(table_1.TableBody, { html: {}, wml: {} }, [
            __this.widget(table_1.TableRow, { html: {}, wml: {} }, [
                __this.widget(table_1.TableCell, { html: {}, wml: {} }, [
                    document.createTextNode("Length Wise")
                ]),
                __this.widget(table_1.TableCell, { html: {}, wml: {} }, [
                    document.createTextNode("lw@theemailplace.com")
                ]),
                __this.widget(table_1.TableCell, { html: {}, wml: {} }, [
                    document.createTextNode("$5000")
                ]),
                __this.widget(table_1.TableCell, { html: {}, wml: {} }, [
                    document.createTextNode("lw")
                ]),
                __this.widget(table_1.TableCell, { html: {}, wml: {} }, [
                    document.createTextNode("Active")
                ])
            ]),
            __this.widget(table_1.TableRow, { html: {}, wml: {} }, [
                __this.widget(table_1.TableCell, { html: {}, wml: {} }, [
                    document.createTextNode("First Chance")
                ]),
                __this.widget(table_1.TableCell, { html: {}, wml: {} }, [
                    document.createTextNode("fchacne@live.tt")
                ]),
                __this.widget(table_1.TableCell, { html: {}, wml: {} }, [
                    document.createTextNode("$1.00")
                ]),
                __this.widget(table_1.TableCell, { html: {}, wml: {} }, [
                    document.createTextNode("chance")
                ]),
                __this.widget(table_1.TableCell, { html: {}, wml: {} }, [
                    document.createTextNode("Inactive")
                ])
            ]),
            __this.widget(table_1.TableRow, { html: {}, wml: {} }, [
                __this.widget(table_1.TableCell, { html: {}, wml: {} }, [
                    document.createTextNode("Du Pear")
                ]),
                __this.widget(table_1.TableCell, { html: {}, wml: {} }, [
                    document.createTextNode("dupear@gmail.com")
                ]),
                __this.widget(table_1.TableCell, { html: {}, wml: {} }, [
                    document.createTextNode("$10,000.00")
                ]),
                __this.widget(table_1.TableCell, { html: {}, wml: {} }, [
                    document.createTextNode("pearboy")
                ]),
                __this.widget(table_1.TableCell, { html: {}, wml: {} }, [
                    document.createTextNode("Active")
                ])
            ])
        ]),
        __this.widget(table_1.TableFooter, { html: {}, wml: {} }, [
            __this.widget(table_1.TableRow, { html: {}, wml: {} }, [
                __this.widget(table_1.TableCell, { html: {}, wml: {} }, [
                    document.createTextNode("1")
                ]),
                __this.widget(table_1.TableCell, { html: {}, wml: {} }, [
                    document.createTextNode("2")
                ]),
                __this.widget(table_1.TableCell, { html: {}, wml: {} }, [
                    document.createTextNode("3")
                ]),
                __this.widget(table_1.TableCell, { html: {}, wml: {} }, [
                    document.createTextNode("4")
                ]),
                __this.widget(table_1.TableCell, { html: {}, wml: {} }, [
                    document.createTextNode("5")
                ])
            ])
        ])
    ];
}; };
;
var Main = /** @class */ (function () {
    function Main(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.widget(demo_1.Demo, { html: {}, wml: {} }, [
                __this.widget(demo_1.Demo, { html: {}, wml: {} }, [
                    __this.node('h3', { html: {}, wml: {} }, [
                        document.createTextNode("Normal")
                    ]),
                    __this.widget(table_1.TableLayout, { html: {}, wml: {} }, (exports.content()(__this)).slice())
                ]),
                __this.widget(demo_1.Demo, { html: {}, wml: {} }, [
                    __this.node('h3', { html: {}, wml: {} }, [
                        document.createTextNode(" Alternate")
                    ]),
                    __this.widget(table_1.TableLayout, { html: {}, wml: {}, ww: { 'alternate': true } }, (exports.content()(__this)).slice())
                ]),
                __this.widget(demo_1.Demo, { html: {}, wml: {} }, [
                    __this.node('h3', { html: {}, wml: {} }, [
                        document.createTextNode("Bordered")
                    ]),
                    __this.widget(table_1.TableLayout, { html: {}, wml: {}, ww: { 'bordered': true } }, (exports.content()(__this)).slice())
                ]),
                __this.widget(demo_1.Demo, { html: {}, wml: {} }, [
                    __this.node('h3', { html: {}, wml: {} }, [
                        document.createTextNode("Hoverable")
                    ]),
                    __this.widget(table_1.TableLayout, { html: {}, wml: {}, ww: { 'hoverable': true } }, (exports.content()(__this)).slice())
                ]),
                __this.widget(demo_1.Demo, { html: {}, wml: {} }, [
                    __this.node('h3', { html: {}, wml: {} }, [
                        document.createTextNode("Compact")
                    ]),
                    __this.widget(table_1.TableLayout, { html: {}, wml: {}, ww: { 'compact': true } }, (exports.content()(__this)).slice())
                ]),
                __this.widget(demo_1.Demo, { html: {}, wml: {} }, [
                    __this.widget(table_1.TableWindow, { html: {}, wml: {} }, [
                        __this.widget(table_1.TableLayout, { html: {}, wml: {} }, (exports.content()(__this)).slice())
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
//# sourceMappingURL=table.js.map