"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var views = require("./wml/table");
var wml_1 = require("@quenk/wml");
var path_1 = require("@quenk/noni/lib/data/record/path");
var util_1 = require("../../util");
var __1 = require("../../");
var sort_1 = require("./column/sort");
var event_1 = require("./event");
exports.DataChangedEvent = event_1.DataChangedEvent;
exports.CellClickedEvent = event_1.CellClickedEvent;
exports.HeadingClickedEvent = event_1.HeadingClickedEvent;
///classNames:begin
exports.DATA_TABLE = 'ww-data-table';
exports.DATA_TABLE_HEAD = 'ww-data-table__head';
exports.DATA_TABLE_HEADING = 'ww-data-table__heading';
exports.DATA_TABLE_BODY = 'ww-data-table__body';
exports.DATA_TABLE_CELL = 'ww-data-table__cell';
exports.ASC = '-asc';
exports.DESC = '-desc';
/**
 * NewHeadContext
 */
var NewHeadContext = /** @class */ (function () {
    function NewHeadContext(table) {
        var _this = this;
        this.table = table;
        this.className = util_1.concat(exports.DATA_TABLE_HEAD, (this.table.attrs.ww && this.table.attrs.ww.headClassName || ''));
        this.columns = this.table.values.columns;
        this.data = this.table.values.dataset[0];
        this.heading = function (c) { return function (i) {
            return (getHeadingFragment(_this.table, c)(new NewHeadingContext(_this.table, c, i)))
                .render();
        }; };
    }
    return NewHeadContext;
}());
exports.NewHeadContext = NewHeadContext;
/**
 * NewHeadingContext
 */
var NewHeadingContext = /** @class */ (function () {
    function NewHeadingContext(table, column, index) {
        var _this = this;
        this.table = table;
        this.column = column;
        this.index = index;
        this.className = util_1.concat(exports.DATA_TABLE_HEADING, (this.table.attrs.ww && this.table.attrs.ww.headingClassName || ''), this.column.headingClassName, getSortClassName(this.table.values.sortKey, this.index));
        this.columns = this.table.values.columns;
        this.data = this.table.values.dataset[0];
        this.onclick = function (_) {
            if (_this.table.values.sortable)
                _this.table.sort(_this.index);
            if (_this.column.onHeadingClicked)
                _this.column.onHeadingClicked(new event_1.HeadingClickedEvent(_this.index));
            if (_this.table.attrs.ww && _this.table.attrs.ww.onHeadingClicked)
                _this.table.attrs.ww.onHeadingClicked(new event_1.HeadingClickedEvent(_this.index));
        };
    }
    return NewHeadingContext;
}());
exports.NewHeadingContext = NewHeadingContext;
/**
 * NewBodyContext
 */
var NewBodyContext = /** @class */ (function () {
    function NewBodyContext(table) {
        var _this = this;
        this.table = table;
        this.className = util_1.concat(exports.DATA_TABLE_BODY, (this.table.attrs.ww && this.table.attrs.ww.bodyClassName || ''));
        this.columns = this.table.values.columns;
        this.data = this.table.values.dataset[0];
        this.cell = function (c) { return function (id) { return function (row) {
            return (getCellFragment(_this.table, c)(new NewCellContext(_this.table, c, id, row)))
                .render();
        }; }; };
    }
    return NewBodyContext;
}());
exports.NewBodyContext = NewBodyContext;
/**
 * NewCellContext
 */
var NewCellContext = /** @class */ (function () {
    function NewCellContext(table, spec, column, row) {
        var _this = this;
        this.table = table;
        this.spec = spec;
        this.column = column;
        this.row = row;
        this.className = util_1.concat(exports.DATA_TABLE_CELL, (this.table.attrs.ww && this.table.attrs.ww.cellClassName || ''), this.spec.cellClassName, getSortClassName(this.table.values.sortKey, this.column));
        this.value = path_1.unsafeGet(this.spec.name, this.table.values.dataset[0][this.row]);
        this.datum = this.table.values.dataset[0][this.row];
        this.format = this.spec.format ? this.spec.format : function (c) { return String(c); };
        this.onclick = function () {
            if (_this.spec.onCellClicked)
                _this.spec.onCellClicked(new event_1.CellClickedEvent(_this.column, _this.row));
            if (_this.table.attrs.ww && _this.table.attrs.ww.onCellClicked)
                _this.table.attrs.ww.onCellClicked(new event_1.CellClickedEvent(_this.column, _this.row));
        };
    }
    return NewCellContext;
}());
exports.NewCellContext = NewCellContext;
/**
 * DataTable can be used for displaying sortable
 * tabular data.
 */
var DataTable = /** @class */ (function (_super) {
    __extends(DataTable, _super);
    function DataTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.values = {
            wml: { id: 'table' },
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.DATA_TABLE, __1.getClassName(_this.attrs)),
            sortable: (_this.attrs.ww && _this.attrs.ww.sortable) ?
                _this.attrs.ww.sortable : false,
            sortKey: ((_this.attrs.ww && _this.attrs.ww.sortKey) ?
                _this.attrs.ww.sortKey : [-1, 1]),
            dataset: ((_this.attrs.ww && _this.attrs.ww.data) ?
                [_this.attrs.ww.data.slice(), _this.attrs.ww.data.slice()] :
                [[], []]),
            columns: (_this.attrs.ww && _this.attrs.ww.columns) ?
                _this.attrs.ww.columns : [],
            thead: function () {
                return (getHeadFragment(_this)(new NewHeadContext(_this))).render();
            },
            tbody: function () {
                return (getBodyFragment(_this)(new NewBodyContext(_this))).render();
            }
        };
        return _this;
    }
    /**
     * @private
     */
    DataTable.prototype.fireChange = function () {
        if (this.attrs.ww && this.attrs.ww.onChange)
            this.attrs.ww.onChange(new event_1.DataChangedEvent(this.values.dataset[0].slice()));
    };
    /**
     * update the data displayed with a new data.
     */
    DataTable.prototype.update = function (data) {
        this.values.dataset = [data.slice(), data.slice()];
        this.fireChange();
        this.view.invalidate();
        return this;
    };
    /**
     * setSortKey changes the internal sort key.
     */
    DataTable.prototype.setSortKey = function (key) {
        this.values.sortKey = key;
        this.view.invalidate();
        return this;
    };
    /**
     * sort the table data by the column id specified.
     *
     * The data can only be sorted by one column at a time and that column
     * must specify the "sort" key.
     *
     * This method causes a repaint.
     */
    DataTable.prototype.sort = function (id) {
        var _a = this.values, columns = _a.columns, sortKey = _a.sortKey, dataset = _a.dataset;
        var _b = sort_1.sortById(columns, sortKey, dataset, id), data = _b[0], key = _b[1];
        this.values.dataset[0] = data;
        this.values.sortKey = key;
        this.fireChange();
        this.view.invalidate();
        return this;
    };
    return DataTable;
}(wml_1.Component));
exports.DataTable = DataTable;
var getHeadFragment = function (table) {
    return (table.attrs.ww && table.attrs.ww.headFragment) ?
        table.attrs.ww.headFragment :
        defaultHeadFragment;
};
var defaultHeadFragment = function (c) { return new views.HeadView(c); };
var getHeadingFragment = function (table, c) {
    return c.headingFragment ? c.headingFragment :
        (table.attrs.ww && table.attrs.ww.headingFragment) ?
            table.attrs.ww.headingFragment :
            defaultHeadingFragment;
};
var defaultHeadingFragment = function (c) { return new views.HeadingView(c); };
var getBodyFragment = function (table) {
    return (table.attrs.ww && table.attrs.ww.bodyFragment) ?
        table.attrs.ww.bodyFragment :
        defaultBodyFragment;
};
var defaultBodyFragment = function (c) { return new views.BodyView(c); };
var getCellFragment = function (table, c) {
    return c.cellFragment ? c.cellFragment :
        (table.attrs.ww && table.attrs.ww.cellFragment) ?
            table.attrs.ww.cellFragment :
            defaultCellFragment;
};
var defaultCellFragment = function (c) { return new views.CellView(c); };
var getSortClassName = function (key, index) {
    return (key[0] === index) ? (key[1] === 1) ? exports.ASC : exports.DESC : '';
};
//# sourceMappingURL=index.js.map