"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var demo_1 = require("../../../widgets/demo");
;
var table_1 = require("../../../../../../lib/layout/table");
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
exports.content = function () { return function (__this) {
    return [
        __this.widget(new table_1.TableHeader({}, [
            __this.widget(new table_1.TableRow({}, [
                __this.widget(new table_1.TableHeading({}, [
                    document.createTextNode("Name")
                ]), {}),
                __this.widget(new table_1.TableHeading({}, [
                    document.createTextNode("Email")
                ]), {}),
                __this.widget(new table_1.TableHeading({}, [
                    document.createTextNode("Balance")
                ]), {}),
                __this.widget(new table_1.TableHeading({}, [
                    document.createTextNode("Username")
                ]), {}),
                __this.widget(new table_1.TableHeading({}, [
                    document.createTextNode("Status")
                ]), {})
            ]), {})
        ]), {}),
        __this.widget(new table_1.TableBody({}, [
            __this.widget(new table_1.TableRow({}, [
                __this.widget(new table_1.TableCell({}, [
                    document.createTextNode("Length Wise")
                ]), {}),
                __this.widget(new table_1.TableCell({}, [
                    document.createTextNode("lw@theemailplace.com")
                ]), {}),
                __this.widget(new table_1.TableCell({}, [
                    document.createTextNode("$5000")
                ]), {}),
                __this.widget(new table_1.TableCell({}, [
                    document.createTextNode("lw")
                ]), {}),
                __this.widget(new table_1.TableCell({}, [
                    document.createTextNode("Active")
                ]), {})
            ]), {}),
            __this.widget(new table_1.TableRow({}, [
                __this.widget(new table_1.TableCell({}, [
                    document.createTextNode("First Chance")
                ]), {}),
                __this.widget(new table_1.TableCell({}, [
                    document.createTextNode("fchacne@live.tt")
                ]), {}),
                __this.widget(new table_1.TableCell({}, [
                    document.createTextNode("$1.00")
                ]), {}),
                __this.widget(new table_1.TableCell({}, [
                    document.createTextNode("chance")
                ]), {}),
                __this.widget(new table_1.TableCell({}, [
                    document.createTextNode("Inactive")
                ]), {})
            ]), {}),
            __this.widget(new table_1.TableRow({}, [
                __this.widget(new table_1.TableCell({}, [
                    document.createTextNode("Du Pear")
                ]), {}),
                __this.widget(new table_1.TableCell({}, [
                    document.createTextNode("dupear@gmail.com")
                ]), {}),
                __this.widget(new table_1.TableCell({}, [
                    document.createTextNode("$10,000.00")
                ]), {}),
                __this.widget(new table_1.TableCell({}, [
                    document.createTextNode("pearboy")
                ]), {}),
                __this.widget(new table_1.TableCell({}, [
                    document.createTextNode("Active")
                ]), {})
            ]), {}),
            __this.widget(new table_1.TableRow({}, [
                __this.widget(new table_1.TableCell({ ww: { 'rowspan': 2, 'colspan': 5 } }, [
                    document.createTextNode("This spans 2 rows 5 columns.")
                ]), { ww: { 'rowspan': 2, 'colspan': 5 } })
            ]), {})
        ]), {}),
        __this.widget(new table_1.TableFooter({}, [
            __this.widget(new table_1.TableRow({}, [
                __this.widget(new table_1.TableCell({}, [
                    document.createTextNode("1")
                ]), {}),
                __this.widget(new table_1.TableCell({}, [
                    document.createTextNode("2")
                ]), {}),
                __this.widget(new table_1.TableCell({}, [
                    document.createTextNode("3")
                ]), {}),
                __this.widget(new table_1.TableCell({}, [
                    document.createTextNode("4")
                ]), {}),
                __this.widget(new table_1.TableCell({}, [
                    document.createTextNode("5")
                ]), {})
            ]), {})
        ]), {})
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
            return __this.widget(new demo_1.Demo({}, [
                __this.widget(new demo_1.Demo({}, [
                    __this.node('h3', {}, [
                        document.createTextNode("Normal")
                    ]),
                    __this.widget(new table_1.TableLayout({}, __spreadArrays((exports.content()(__this)))), {})
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('h3', {}, [
                        document.createTextNode(" Alternate")
                    ]),
                    __this.widget(new table_1.TableLayout({ ww: { 'alternate': true } }, __spreadArrays((exports.content()(__this)))), { ww: { 'alternate': true } })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('h3', {}, [
                        document.createTextNode("Bordered")
                    ]),
                    __this.widget(new table_1.TableLayout({ ww: { 'bordered': true } }, __spreadArrays((exports.content()(__this)))), { ww: { 'bordered': true } })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('h3', {}, [
                        document.createTextNode("Hoverable")
                    ]),
                    __this.widget(new table_1.TableLayout({ ww: { 'hoverable': true } }, __spreadArrays((exports.content()(__this)))), { ww: { 'hoverable': true } })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.node('h3', {}, [
                        document.createTextNode("Compact")
                    ]),
                    __this.widget(new table_1.TableLayout({ ww: { 'compact': true } }, __spreadArrays((exports.content()(__this)))), { ww: { 'compact': true } })
                ]), {}),
                __this.widget(new demo_1.Demo({}, [
                    __this.widget(new table_1.TableWindow({}, [
                        __this.widget(new table_1.TableLayout({}, __spreadArrays((exports.content()(__this)))), {})
                    ]), {})
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
//# sourceMappingURL=table.js.map