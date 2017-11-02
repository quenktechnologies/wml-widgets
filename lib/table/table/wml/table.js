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
var $wml = require("@quenk/wml");
;
var names = require("@package/self/common/names");
;
var util_1 = require("@package/self/common/util");
;
var CellClickedEvent_1 = require("../CellClickedEvent");
;
var RowClickedEvent_1 = require("../RowClickedEvent");
;
var RowSelectedEvent_1 = require("../RowSelectedEvent");
;
var HeadingClickedEvent_1 = require("../HeadingClickedEvent");
;
var property_seek_1 = require("property-seek");
;
var Fragment_1 = require("@package/self/layout/fragment/Fragment");
;
exports.allSelectedCheckbox = function () { return function (___context) { return function (___view) { return $wml.node('th', {
    html: {},
    wml: {}
}, [$wml.node('input', {
        html: {
            'type': "checkbox",
            'onclick': function () { return ___context.model.allSelected(); }
        },
        wml: {}
    }, [], ___view)], ___view); }; }; };
;
exports.headings = function (fields) { return function (___context) { return function (___view) { return $wml.map(fields, function _map(field) {
    return $wml.ifthen(field.sortAs, function then() {
        return $wml.node('th', {
            html: {
                'class': util_1.concat(___context.values.class.heading, ((___context.values.sortedOn === field.name)) ? names.ACTIVE : ""),
                'onclick': function () { return ___context.model.headingClicked(new HeadingClickedEvent_1.HeadingClickedEvent(field.name, field)); }
            },
            wml: {}
        }, [$wml.domify(field.heading), $wml.ifthen((___context.values.sortedOn === field.name), function then() {
                return $wml.domify(___context.values.arrow);
            }, function else_clause() {
                return $wml.domify("");
            })], ___view);
    }, function else_clause() {
        return $wml.node('th', {
            html: {
                'class': util_1.concat(___context.values.class.heading, ((___context.values.sortedOn === field.name)) ? names.ACTIVE : ""),
                'onclick': function () { return ___context.model.headingClicked(new HeadingClickedEvent_1.HeadingClickedEvent(field.name, field)); }
            },
            wml: {}
        }, [$wml.domify(field.heading), $wml.domify(((___context.values.sortedOn === field.name)) ? ___context.values.arrow : "")], ___view);
    });
}, function otherwise() {
    return document.createDocumentFragment();
}); }; }; };
;
exports.thead = function (fields) { return function (___context) { return function (___view) { return $wml.node('tr', {
    html: {},
    wml: {}
}, [$wml.ifthen(___context.values.options.selectable, function then() {
        return $wml.box($wml.domify(exports.allSelectedCheckbox()(___context)(___view)), $wml.domify(exports.headings(fields)(___context)(___view)));
    }, function else_clause() {
        return $wml.domify(exports.headings(fields)(___context)(___view));
    })], ___view); }; }; };
;
exports.rowSelectCheckbox = function (row, index, data) { return function (___context) { return function (___view) { return $wml.ifthen(___context.values.options.selectable, function then() {
    return $wml.node('td', {
        html: {},
        wml: {}
    }, [$wml.node('input', {
            html: {
                'type': "checkbox",
                'onclick': function () { return ___context.model.rowSelected(new RowSelectedEvent_1.RowSelectedEvent(row, index, data)); }
            },
            wml: {}
        }, [], ___view)], ___view);
}, function else_clause() {
    return $wml.domify(null);
}); }; }; };
;
exports.rows = function (row, index, fields) { return function (___context) { return function (___view) { return $wml.map(fields, function _map(field) {
    return $wml.node('td', {
        html: {
            'class': ___context.values.class.cell,
            'onclick': function () { return ___context.model.cellClicked(new CellClickedEvent_1.CellClickedEvent(property_seek_1.get(field.name, row), field.name, index, row)); }
        },
        wml: {}
    }, [$wml.ifthen(field.fragment, function then() {
            return $wml.domify(field.fragment(property_seek_1.get(field.name, row), field.name, row, field)(___view));
        }, function else_clause() {
            return $wml.domify(property_seek_1.get(field.name, row));
        })], ___view);
}, function otherwise() {
    return document.createDocumentFragment();
}); }; }; };
;
exports.tbody = function (data, fields) { return function (___context) { return function (___view) { return $wml.map(data, function _map(row, index) {
    return $wml.node('tr', {
        html: {
            'class': ___context.values.class.row,
            'onclick': function () { return ___context.model.rowClicked(new RowClickedEvent_1.RowClickedEvent(row, index, data)); }
        },
        wml: {}
    }, [$wml.ifthen(___context.values.options.selectable, function then() {
            return $wml.box($wml.domify(exports.rowSelectCheckbox(row, index, data)(___context)(___view)), $wml.domify(exports.rows(row, index, fields)(___context)(___view)));
        }, function else_clause() {
            return $wml.domify(exports.rows(row, index, fields)(___context)(___view));
        })], ___view);
}, function otherwise() {
    return document.createDocumentFragment();
}); }; }; };
;
exports.table = function () { return function (___context) { return function (___view) { return $wml.node('table', {
    html: {
        'class': ___context.values.class.root
    },
    wml: {
        'id': ___context.values.id.root
    }
}, [$wml.node('thead', {
        html: {},
        wml: {
            'id': "head"
        }
    }, [$wml.domify(exports.thead(___context.values.fields)(___context)(___view))], ___view), $wml.node('tbody', {
        html: {},
        wml: {
            'id': "body"
        }
    }, [$wml.domify(exports.tbody(___context.values.data, ___context.values.fields)(___context)(___view))], ___view)], ___view); }; }; };
;
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table(context) {
        var _this = _super.call(this, context) || this;
        _this.template = function (___context, ___view) {
            return $wml.widget(Fragment_1.Fragment, {
                html: {},
                wml: {}
            }, [$wml.ifthen((___context.values.data.length === 0), function then() {
                    return $wml.ifthen(___context.values.fragment.empty, function then() {
                        return $wml.domify(___context.values.fragment.empty()(___view));
                    }, function else_clause() {
                        return $wml.domify(exports.table()(___context)(___view));
                    });
                }, function else_clause() {
                    return $wml.domify(exports.table()(___context)(___view));
                })], ___view);
        };
        return _this;
    }
    return Table;
}($wml.AppView));
exports.Table = Table;
//# sourceMappingURL=table.js.map