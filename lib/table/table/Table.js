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
var names = require("@package/self/common/names");
var view = require("./wml/table");
var util_1 = require("@package/self/common/util");
var wml_1 = require("@quenk/wml");
var property_seek_1 = require("property-seek");
var ASC_ARROW = '\u21e7';
var DESC_ARROW = '\u21e9';
exports.dateSort = function (a, b) {
    var na = new Date(a).getTime();
    var nb = new Date(b).getTime();
    return na > nb ? -1 : na < nb ? 1 : 0;
};
exports.stringSort = function (a, b) {
    var la = String(a).replace(/\s+/, '').toLowerCase();
    var lb = String(b).replace(/\s+/, '').toLowerCase();
    return (la > lb) ? -1 : (la < lb) ? 1 : 0;
};
exports.naturalSort = function (a, b) {
    if (a === void 0) { a = ''; }
    if (b === void 0) { b = ''; }
    //Source: http://stackoverflow.com/questions/4340227/sort-mixed-alpha-numeric-array
    var reA = /[^a-zA-Z]/g;
    var reN = /[^0-9]/g;
    var AInt = parseInt(a, 10);
    var BInt = parseInt(b, 10);
    if (isNaN(AInt) && isNaN(BInt)) {
        var aA = a.replace(reA, '');
        var bA = b.replace(reA, '');
        if (aA === bA) {
            var aN = parseInt(a.replace(reN, ''), 10);
            var bN = parseInt(b.replace(reN, ''), 10);
            return aN === bN ? 0 : aN > bN ? -1 : 1;
        }
        else {
            return aA > bA ? -1 : 1;
        }
    }
    else if (isNaN(AInt)) {
        return -1; //to make alphanumeric sort first return -1 here
    }
    else if (isNaN(BInt)) {
        return 1; //to make alphanumeric sort first return 1 here
    }
    else {
        return AInt > BInt ? -1 : 1;
    }
};
exports.numberSort = function (a, b) {
    var na = parseFloat(a);
    var nb = parseFloat(b);
    na = (isNaN(a)) ? -Infinity : a;
    nb = (isNaN(b)) ? -Infinity : b;
    return (na > nb) ? -1 : (na < nb) ? 1 : 0;
};
var DefaultTableModel = /** @class */ (function () {
    function DefaultTableModel(table) {
        this.table = table;
    }
    DefaultTableModel.prototype.allSelected = function () { };
    DefaultTableModel.prototype.cellClicked = function (_e) { };
    DefaultTableModel.prototype.headingClicked = function (_e) { };
    DefaultTableModel.prototype.rowClicked = function (_e) { };
    DefaultTableModel.prototype.rowSelected = function (_e) { };
    return DefaultTableModel;
}());
exports.DefaultTableModel = DefaultTableModel;
var SortTableModel = /** @class */ (function (_super) {
    __extends(SortTableModel, _super);
    function SortTableModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SortTableModel.prototype.headingClicked = function (e) { this.table.sort(e.name); };
    return SortTableModel;
}(DefaultTableModel));
exports.SortTableModel = SortTableModel;
/**
 * Table provides a smarter html table.
 */
var Table = /** @class */ (function (_super) {
    __extends(Table, _super);
    function Table() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.originalData = _this.attrs.ww.data;
        _this.view = new view.Table(_this);
        _this.model = _this.attrs.ww.model ?
            _this.attrs.ww.model :
            new SortTableModel(_this);
        _this.values = {
            id: {
                root: 'root',
            },
            class: {
                root: util_1.concat(names.TABLE, _this.attrs.ww.class),
                row: _this.attrs.ww.rowClass || '',
                cell: _this.attrs.ww.cellClass || '',
                heading: _this.attrs.ww.headingClass || ''
            },
            fragment: {
                empty: _this.attrs.ww.empty
            },
            options: {
                selectable: _this.attrs.ww.selectable
            },
            sortedOn: '',
            data: _this.originalData.slice(),
            fields: _this.attrs.ww.fields,
            arrow: ''
        };
        return _this;
    }
    Table.prototype.sort = function (name) {
        var fields = this.attrs.ww ? this.attrs.ww.fields ? this.attrs.ww.fields : [] : [];
        var field = fields.reduce(function (p, c) { return p ? p : (c.name === name ? c : null); });
        var sortOn;
        var strategy;
        if (!field)
            throw new Error("Table#sort: unknown field '" + name + "'");
        sortOn = field.sortAs || name;
        strategy = field.strategy || exports.stringSort;
        if (this.values.sortedOn === name) {
            this.values.data = this.values.data.reverse();
            this.values.arrow = (this.values.arrow === ASC_ARROW) ? DESC_ARROW : ASC_ARROW;
        }
        else {
            this.values.arrow = DESC_ARROW;
            this.values.data = this
                .originalData
                .slice()
                .sort(function (a, b) { return strategy(property_seek_1.get(sortOn, a), property_seek_1.get(sortOn, b)); });
        }
        this.values.sortedOn = name;
        this.view.invalidate();
    };
    /**
     * update the data the table displays
     */
    Table.prototype.update = function (data) {
        this.originalData = data.slice();
        this.values.data = data.slice();
        (this.values.sortedOn === '') ? this.view.invalidate() : this.sort(this.values.sortedOn);
    };
    return Table;
}(wml_1.Component));
exports.Table = Table;
//# sourceMappingURL=Table.js.map