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
var path_1 = require("@quenk/noni/lib/data/record/path");
var wml_1 = require("@quenk/wml");
var util_1 = require("../../util");
var __1 = require("../../");
///classNames:begin
exports.DATA_TABLE = 'ww-data-table';
///classNames:end
exports.ASC_ARROW = '\u21e7';
exports.DESC_ARROW = '\u21e9';
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
 * DataTable provides a smarter html table.
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
                data: (_this.attrs.ww && _this.attrs.ww.data) ? _this.attrs.ww.data : [],
                get: function (column) { return function (row) {
                    return path_1.get(column, _this.values.table.data[row]).get();
                }; },
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
                        className: _this.attrs.ww && _this.attrs.ww.thClassName,
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
                            return util_1.concat(c.className ? c.className : '', (_this.attrs.ww && _this.attrs.ww.tdClassName) ?
                                _this.attrs.ww.tdClassName : '');
                        },
                        onclick: function (column) { return function (row) { return function () {
                            return _this.delegate.onCellClicked(new CellClickedEvent(column, row));
                        }; }; },
                        content: function (r) { return function (c) {
                            var maybeValue = path_1.get(c.name, r);
                            if (maybeValue.isNothing()) {
                                return [__1.text('')];
                            }
                            else {
                                var value = c.apply ?
                                    c.apply(maybeValue.get()) : maybeValue.get();
                                if (c.cellFragment) {
                                    return c.cellFragment(value)(c.name)(r)(_this.view);
                                }
                                else {
                                    return [__1.text('' + value)];
                                }
                            }
                        }; }
                    }
                }
            },
            columns: (_this.attrs.ww && _this.attrs.ww.columns) ?
                _this.attrs.ww.columns : []
        };
        return _this;
    }
    /**
     * setData updates the table with new dataset.
     */
    DataTable.prototype.setData = function (data) {
        this.values.table.data = data;
        this.view.invalidate();
        return this;
    };
    return DataTable;
}(wml_1.Component));
exports.DataTable = DataTable;
var idTD = function (column) { return function (colNumber) { return function (rowNumber) {
    return "" + column + colNumber + "," + rowNumber;
}; }; };
//# sourceMappingURL=index.js.map