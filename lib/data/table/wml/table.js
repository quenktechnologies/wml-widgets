"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ___wml = require("@quenk/wml");
var util_1 = require("../../../util");
;
var property_seek_1 = require("property-seek");
;
var fragment_1 = require("../../../layout/fragment");
;
var classNames_1 = require("../../../content/state/active/classNames");
;
exports.thead = function (___context) { return function (columns) { return function (___view) { return ___wml.node('thead', {
    html: {},
    wml: {
        'id': ___context.values.table.thead.id
    }
}, [___wml.domify(exports.heads(___context)(columns)(___view))], ___view); }; }; };
;
exports.heads = function (___context) { return function (columns) { return function (___view) { return ___wml.node('tr', {
    html: {},
    wml: {}
}, [(___context.values.options.selectable) ? ___wml.box(___wml.domify(exports.allSelectedCheckbox(___context)(___view)), ___wml.domify(exports.headings(___context)(columns)(___view))) : ___wml.domify(exports.headings(___context)(columns)(___view))], ___view); }; }; };
;
exports.allSelectedCheckbox = function (___context) { return function (___view) { return ___wml.node('th', {
    html: {},
    wml: {}
}, [___wml.node('input', {
        html: {
            'type': "checkbox",
            'onclick': ___context.values.table.thead.onCheck
        },
        wml: {}
    }, [], ___view)], ___view); }; };
;
exports.headings = function (___context) { return function (columns) { return function (___view) { return ___wml.map(columns, function _map(field) {
    return (field.sortAs) ? ___wml.node('th', {
        html: {
            'class': util_1.concat(___context.values.table.thead.th.class, ((___context.values.sortedOn === field.name)) ? classNames_1.ACTIVE : ""),
            'onclick': ___context.values.table.thead.th.onclick(field.name)
        },
        wml: {}
    }, [___wml.domify(field.heading), ((___context.values.sortedOn === field.name)) ? ___wml.domify(___context.values.arrow) : ___wml.domify("")], ___view) : ___wml.node('th', {
        html: {
            'class': util_1.concat(___context.values.table.thead.th.class, ((___context.values.sortedOn === field.name)) ? classNames_1.ACTIVE : ""),
            'onclick': ___context.values.table.thead.th.onclick(field.name)
        },
        wml: {}
    }, [___wml.domify(field.heading), ___wml.domify(((___context.values.sortedOn === field.name)) ? ___context.values.arrow : "")], ___view);
}, function otherwise() {
    return document.createDocumentFragment();
}); }; }; };
;
exports.tbody = function (___context) { return function (data) { return function (columns) { return function (___view) { return ___wml.node('tbody', {
    html: {},
    wml: {
        'id': ___context.values.table.tbody.id
    }
}, [___wml.domify(exports.rows(___context)(data)(columns)(___view))], ___view); }; }; }; };
;
exports.rows = function (___context) { return function (data) { return function (columns) { return function (___view) { return ___wml.map(data, function _map(rowData, index) {
    return ___wml.node('tr', {
        html: {
            'class': ___context.values.table.tbody.tr.class,
            'onclick': ___context.values.table.tbody.tr.onclick(rowData, index, data)
        },
        wml: {}
    }, [___wml.domify(exports.cells(___context)(rowData)(index)(columns)(___view))], ___view);
}, function otherwise() {
    return document.createDocumentFragment();
}); }; }; }; };
;
exports.cells = function (___context) { return function (rowData) { return function (rowNumber) { return function (columns) { return function (___view) { return ___wml.box((___context.values.options.selectable) ? ___wml.domify(exports.rowSelectCheckbox(___context)(rowData)(rowNumber)(___view)) : ___wml.domify(""), ___wml.map(columns, function _map(field, index) {
    return ___wml.node('td', {
        html: {
            'class': ___context.values.table.tbody.td.class,
            'onclick': ___context.values.table.tbody.td.onclick(property_seek_1.get(field.name, rowData), field.name, rowData, rowNumber)
        },
        wml: {
            'id': ___context.values.table.tbody.td.id(field.name, index, rowNumber)
        }
    }, [(field.fragment) ? ___wml.domify(field.fragment(property_seek_1.get(field.name, rowData))(field.name)(rowData)(___view)) : ___wml.domify(property_seek_1.get(field.name, rowData))], ___view);
}, function otherwise() {
    return document.createDocumentFragment();
})); }; }; }; }; };
;
exports.rowSelectCheckbox = function (___context) { return function (row) { return function (index) { return function (___view) { return (___context.values.options.selectable) ? ___wml.node('td', {
    html: {},
    wml: {}
}, [___wml.node('input', {
        html: {
            'type': "checkbox",
            'onclick': ___context.values.table.tbody.tr.onCheck(row, index, ___context.values.data)
        },
        wml: {}
    }, [], ___view)], ___view) : ___wml.domify(""); }; }; }; };
;
exports.table = function (___context) { return function (___view) { return ___wml.node('table', {
    html: {
        'class': ___context.values.table.class
    },
    wml: {
        'id': ___context.values.table.id
    }
}, [___wml.domify(___context.values.table.thead.template(___context)(___context.values.columns)(___view)), ___wml.domify(___context.values.table.tbody.template(___context)(___context.values.data)(___context.values.columns)(___view))], ___view); }; };
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(___context) {
        var _this = _super.call(this, ___context) || this;
        _this.template = function (___view) {
            return ___wml.widget(fragment_1.Fragment, {
                html: {},
                wml: {}
            }, [((___context.values.data.length === 0)) ? (___context.values.empty) ? ___wml.domify(___context.values.empty(___view)) : ___wml.domify(exports.table(___context)(___view)) : ___wml.domify(exports.table(___context)(___view))], ___view);
        };
        return _this;
    }
    return Main;
}(___wml.AppView));
exports.Main = Main;
//# sourceMappingURL=table.js.map