"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
var table_1 = require("../../../layout/table");
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
exports.thead = function (t) { return function (columns) { return function (__this) {
    return [
        __this.node('thead', { html: { 'class': t.values.table.thead.className }, wml: { 'id': t.values.table.thead.wml.id } }, [
            __this.node('tr', { html: {}, wml: {} }, __forIn(columns, function (field, _$$i, _$$all) {
                return ([
                    __this.node('th', { html: { 'class': t.values.table.thead.th.className, 'onclick': t.values.table.thead.th.onclick(field.name) }, wml: {} }, (t.values.table.thead.th.content(field)).slice())
                ]);
            }, function () { return ([]); }).slice())
        ])
    ];
}; }; };
;
exports.tbody = function (t) { return function (columns) { return function (data) { return function (__this) {
    return [
        __this.node('tbody', { html: {}, wml: { 'id': t.values.table.tbody.id } }, __forIn(data, function (rowData, rowIdx, _$$all) {
            return ([
                __this.node('tr', { html: { 'class': t.values.table.tbody.tr.className, 'onclick': t.values.table.tbody.tr.onclick(rowIdx) }, wml: {} }, __forIn(columns, function (field, cellIdx, _$$all) {
                    return ([
                        __this.node('td', { html: { 'class': t.values.table.tbody.td.className(field), 'onclick': t.values.table.tbody.td.onclick(field.name)(rowIdx) }, wml: { 'id': t.values.table.tbody.td.id(field.name)(cellIdx)(rowIdx) } }, (t.values.table.tbody.td.content(rowData)(field)).slice())
                    ]);
                }, function () { return ([]); }).slice())
            ]);
        }, function () { return ([]); }).slice())
    ];
}; }; }; };
;
var Main = /** @class */ (function () {
    function Main(__context) {
        this.ids = {};
        this.groups = {};
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.widget(table_1.TableLayout, { html: {}, wml: { 'id': __context.values.table.wml.id }, ww: { 'id': __context.values.table.id, 'className': __context.values.table.className, 'alternate': __context.values.table.alternate, 'bordered': __context.values.table.bordered, 'compact': __context.values.table.compact, 'hoverable': __context.values.table.hoverable } }, (__context.values.table.thead.template()(__context)(__context.values.columns)(__this)).concat((__context.values.table.tbody.template()(__context)(__context.values.columns)(__context.values.table.data)(__this))));
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