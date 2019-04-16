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
exports.THEAD = 'thead';
exports.TBODY = 'tbody';
/**
 * CellClickedEvent triggered when whitespace in a cell is clicked.
 */
var CellClickedEvent = /** @class */ (function () {
    function CellClickedEvent(column, row) {
        this.column = column;
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
 * DefaultDelegate will handle table events if no Delegate is
 * specified.
 *
 * It passes it's events onto registered callbacks.
 */
var DefaultDelegate = /** @class */ (function () {
    function DefaultDelegate(table) {
        this.table = table;
    }
    DefaultDelegate.prototype.onCellClicked = function (e) {
        if (this.table.attrs.ww && this.table.attrs.ww.onCellClicked)
            this.table.attrs.ww.onCellClicked(e);
    };
    DefaultDelegate.prototype.onHeadingClicked = function (e) {
        if (this.table.attrs.ww && this.table.attrs.ww.onHeadingClicked)
            this.table.attrs.ww.onHeadingClicked(e);
    };
    DefaultDelegate.prototype.onRowClicked = function (e) {
        if (this.table.attrs.ww && this.table.attrs.ww.onRowClicked)
            this.table.attrs.ww.onRowClicked(e);
    };
    return DefaultDelegate;
}());
exports.DefaultDelegate = DefaultDelegate;
/**
 * DataTable provides a smarter html table.
 */
var DataTable = /** @class */ (function (_super) {
    __extends(DataTable, _super);
    function DataTable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.view = new views.Main(_this);
        _this.delegate = (_this.attrs.ww && _this.attrs.ww.delegate) ?
            _this.attrs.ww.delegate : new DefaultDelegate(_this);
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
                    template: function () { return ((_this.attrs.ww && _this.attrs.ww.thead) ?
                        _this.attrs.ww.thead : views.thead); },
                    th: {
                        className: _this.attrs.ww && _this.attrs.ww.thClassName,
                        content: function (col) { return __1.text(col.heading); },
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
                                if (c.fragment) {
                                    return c.fragment(value)(c.name)(r)(_this.view);
                                }
                                else {
                                    return [__1.text('' + value)];
                                }
                            }
                        }; }
                    }
                }
            },
            sort: {
                key: '',
                arrow: '',
                original: (_this.attrs.ww && _this.attrs.ww.data) ?
                    _this.attrs.ww.data : []
            },
            columns: (_this.attrs.ww && _this.attrs.ww.columns) ?
                _this.attrs.ww.columns : []
        };
        return _this;
    }
    /**
        sort(name: string): DataTable<C, R> {
    
          let columns = this.values.columns;
  
          let field = columns.reduce((p, c) =>
            p ? p : (c.name === name ? c : null));
  
          let sortOn: string;
  
            let strategy: SortingStrategy;
    
            if (!field)
                throw new Error(`Table#sort: unknown field '${name}'`);
    
            sortOn = field.sortAs || name;
            strategy = field.strategy || stringSort;
    
            if (this.values.sortedOn === name) {
    
                this.values.data = this.values.data.reverse();
                this.values.arrow = (this.values.arrow === ASC_ARROW) ? DESC_ARROW : ASC_ARROW;
    
            } else {
    
                this.values.arrow = DESC_ARROW;
                this.values.data = this
                    .originalData
                    .slice()
                    .sort((a, b) => strategy(<Comparable>get(sortOn, a), <Comparable>get(sortOn, b)));
    
            }
    
            this.values.sortedOn = name;
            this.view.invalidate();
            return this;
    
        }*/
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
    else if (isNaN(AInt)) { //A is not an Int
        return -1; //to make alphanumeric sort first return -1 here
    }
    else if (isNaN(BInt)) { //B is not an Int
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
var idTD = function (column) { return function (colNumber) { return function (rowNumber) {
    return "" + column + colNumber + "," + rowNumber;
}; }; };
//# sourceMappingURL=index.js.map