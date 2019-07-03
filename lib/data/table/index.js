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
var views = require("./wml/table");
var sort_1 = require("@quenk/noni/lib/data/array/sort");
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var path_1 = require("@quenk/noni/lib/data/record/path");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var __1 = require("../../");
///classNames:begin
exports.DATA_TABLE = 'ww-data-table';
/**
 * HeadingClicked is triggered when the user clicks on
 * one of the column headings.
 */
var HeadingClickedEvent = /** @class */ (function () {
    function HeadingClickedEvent(column) {
        this.column = column;
    }
    return HeadingClickedEvent;
}());
exports.HeadingClickedEvent = HeadingClickedEvent;
/**
 * RowClickedEvent is triggered when the user clicks on whitespace in
 * the row of a table.
 */
var RowClickedEvent = /** @class */ (function () {
    function RowClickedEvent(row) {
        this.row = row;
    }
    return RowClickedEvent;
}());
exports.RowClickedEvent = RowClickedEvent;
/**
 * CellClickedEvent triggered when a cell or its contents is clicked.
 */
var CellClickedEvent = /** @class */ (function () {
    function CellClickedEvent(name, row) {
        this.name = name;
        this.row = row;
    }
    return CellClickedEvent;
}());
exports.CellClickedEvent = CellClickedEvent;
/**
 * DataChangedEvent generated when the internal representation of the data
 * changes.
 */
var DataChangedEvent = /** @class */ (function () {
    function DataChangedEvent(data) {
        this.data = data;
    }
    return DataChangedEvent;
}());
exports.DataChangedEvent = DataChangedEvent;
/**
 * DataSortedEvent is generated when the internal representation of the
 * data has been sorted.
 * It provides a copy of the sorted data, the column name
 * and the direction (1 for ascending, -1 for descending).
 */
var DataSortedEvent = /** @class */ (function () {
    function DataSortedEvent(data, column, dir) {
        this.data = data;
        this.column = column;
        this.dir = dir;
    }
    return DataSortedEvent;
}());
exports.DataSortedEvent = DataSortedEvent;
/**
 * Range of table cells.
 */
var Range = /** @class */ (function () {
    function Range(elements) {
        this.elements = elements;
    }
    /**
     * setContent of the cells in this Range.
     */
    Range.prototype.setContent = function (content) {
        for (var i = 0; i < this.elements.length; i++) {
            var el = this.elements[i];
            while (el.lastChild)
                el.removeChild(el.lastChild);
            for (var c = 0; c < content.length; c++)
                el.appendChild(content[c]);
        }
        return this;
    };
    return Range;
}());
exports.Range = Range;
/**
 * @private
 */
var Delegate = /** @class */ (function () {
    function Delegate(table) {
        this.table = table;
    }
    Delegate.prototype.onCellClicked = function (e) {
        if (this.table.attrs.ww && this.table.attrs.ww.onCellClicked)
            this.table.attrs.ww.onCellClicked(e);
    };
    Delegate.prototype.onHeadingClicked = function (e) {
        if (this.table.attrs.ww && this.table.attrs.ww.onHeadingClicked)
            this.table.attrs.ww.onHeadingClicked(e);
    };
    Delegate.prototype.onRowClicked = function (e) {
        if (this.table.attrs.ww && this.table.attrs.ww.onRowClicked)
            this.table.attrs.ww.onRowClicked(e);
    };
    return Delegate;
}());
exports.Delegate = Delegate;
/**
 * DataTable can be used for displaying sortable
 * tabular data.
 */
var DataTable = /** @class */ (function (_super) {
    __extends(DataTable, _super);
    function DataTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.delegate = new Delegate(_this);
        _this.values = {
            table: {
                wml: {
                    id: 'table'
                },
                id: __1.getId(_this.attrs),
                className: util_1.concat(exports.DATA_TABLE, __1.getClassName(_this.attrs)),
                alternate: (_this.attrs.ww && _this.attrs.ww.alternate),
                bordered: (_this.attrs.ww && _this.attrs.ww.bordered),
                compact: (_this.attrs.ww && _this.attrs.ww.compact),
                hoverable: (_this.attrs.ww && _this.attrs.ww.hoverable),
                data: (_this.attrs.ww && _this.attrs.ww.data) ?
                    _this.attrs.ww.data.slice() : [],
                dir: 0,
                sortedOn: '',
                pristine: (_this.attrs.ww && _this.attrs.ww.data) ?
                    _this.attrs.ww.data.slice() : [],
                thead: {
                    wml: {
                        id: 'thead'
                    },
                    className: (_this.attrs.ww && _this.attrs.ww.theadClassName),
                    template: function () {
                        return (_this.attrs.ww && _this.attrs.ww.thead) ?
                            _this.attrs.ww.thead : views.thead;
                    },
                    th: {
                        className: function (c) {
                            return util_1.concat((_this.attrs.ww && _this.attrs.ww.thClassName) ?
                                _this.attrs.ww.thClassName : '', String(c.headingClassName));
                        },
                        content: function (col) { return (col.headingFragment) ?
                            col.headingFragment(col)(_this.view) :
                            [__1.text(col.heading)]; },
                        onclick: function (field) { return function () {
                            _this.delegate.onHeadingClicked(new HeadingClickedEvent(field));
                        }; },
                    }
                },
                tbody: {
                    id: 'tbody',
                    template: function () { return (_this.attrs.ww && _this.attrs.ww.tbody) ?
                        _this.attrs.ww.tbody : views.tbody; },
                    tr: {
                        className: _this.attrs.ww && _this.attrs.ww.trClassName,
                        onclick: function (row) { return function () {
                            _this.delegate.onRowClicked(new RowClickedEvent(row));
                        }; },
                    },
                    td: {
                        id: idTD,
                        className: function (c) {
                            return util_1.concat(c.cellClassName ? c.cellClassName : '', (_this.attrs.ww && _this.attrs.ww.tdClassName) ?
                                _this.attrs.ww.tdClassName : '');
                        },
                        onclick: function (column) { return function (row) { return function () {
                            return _this.delegate.onCellClicked(new CellClickedEvent(column, row));
                        }; }; },
                        content: function (idx) { return function (r) { return function (c) {
                            var maybeValue = path_1.get(c.name, r);
                            if (maybeValue.isNothing()) {
                                return [__1.text('')];
                            }
                            else {
                                var value = maybeValue.get();
                                if (c.cellFragment) {
                                    return c.cellFragment(value)(idx)(r)(_this.view);
                                }
                                else {
                                    if (c.format)
                                        return [__1.text(c.format(value))];
                                    return [__1.text('' + value)];
                                }
                            }
                        }; }; }
                    }
                }
            },
            columns: (_this.attrs.ww && _this.attrs.ww.columns) ?
                _this.attrs.ww.columns : []
        };
        return _this;
    }
    /**
     * @private
     */
    DataTable.prototype.fireChange = function () {
        if (this.attrs.ww && this.attrs.ww.onChange)
            this.attrs.ww.onChange(new DataChangedEvent(this.values.table.data.slice()));
    };
    /**
     * @private
     */
    DataTable.prototype.fireSort = function () {
        if (this.attrs.ww && this.attrs.ww.onSort)
            this.attrs.ww.onSort(new DataSortedEvent(this.values.table.data, this.values.table.sortedOn, this.values.table.dir));
    };
    /**
     * setData updates the table with new dataset.
     */
    DataTable.prototype.setData = function (data) {
        this.values.table.data = data.slice();
        this.values.table.pristine = data.slice();
        this.fireChange();
        this.view.invalidate();
        return this;
    };
    /**
     * sort the data on the colum specified.
     *
     * Sorting is always done using the original data
     * or the data from setData().
     */
    DataTable.prototype.sort = function (name) {
        var columns = this.values.columns;
        var mField = columns.reduce(function (p, c) {
            return p.isJust() ? p : (c.name === name) ? maybe_1.just(c) : p;
        }, maybe_1.nothing());
        if (mField.isNothing())
            return this;
        var field = mField.get();
        var sortOn = field.sortOn || name;
        var strategy = getStrategy(sortOn);
        this.values.table.sortedOn = name;
        this.values.table.dir = 1;
        this.values.table.data =
            this
                .values
                .table
                .pristine
                .slice()
                .sort(function (a, b) { return strategy(getAny(sortOn, a), getAny(sortOn, b)); });
        this.fireSort();
        this.fireChange();
        this.view.invalidate();
        return this;
    };
    /**
     * reverse sort the data displayed.
     */
    DataTable.prototype.reverse = function () {
        this.values.table.data = this.values.table.data.reverse();
        this.values.table.dir = -1;
        this.fireSort();
        this.fireChange();
        this.view.invalidate();
        return this;
    };
    return DataTable;
}(wml_1.Component));
exports.DataTable = DataTable;
var idTD = function (column) { return function (colNumber) { return function (rowNumber) {
    return "" + column + colNumber + "," + rowNumber;
}; }; };
var getAny = function (path, src) {
    return path_1.getDefault(path, src, undefined);
};
var getStrategy = function (s) {
    if (typeof s === 'function')
        return s;
    else if (s === 'date')
        return sort_1.date;
    else if (s === 'number')
        return sort_1.number;
    else if (s === 'string')
        return sort_1.string;
    else
        (s === 'natural');
    return sort_1.natural;
};
//# sourceMappingURL=index.js.map