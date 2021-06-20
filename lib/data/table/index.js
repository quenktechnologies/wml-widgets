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
exports.DataTable = exports.NewCellContext = exports.NewBodyContext = exports.NewHeadingContext = exports.NewHeadContext = exports.DESC = exports.ASC = exports.DATA_TABLE_CELL = exports.DATA_TABLE_BODY = exports.DATA_TABLE_HEADING = exports.DATA_TABLE_HEAD = exports.DATA_TABLE = exports.HeadingClickedEvent = exports.CellClickedEvent = exports.DataChangedEvent = exports.SortRequest = void 0;
var views = require("./wml/table");
var wml_1 = require("@quenk/wml");
var array_1 = require("@quenk/noni/lib/data/array");
var path_1 = require("@quenk/noni/lib/data/record/path");
var util_1 = require("../../util");
var __1 = require("../../");
var sort_1 = require("./column/sort");
Object.defineProperty(exports, "SortRequest", { enumerable: true, get: function () { return sort_1.SortRequest; } });
var event_1 = require("./event");
Object.defineProperty(exports, "DataChangedEvent", { enumerable: true, get: function () { return event_1.DataChangedEvent; } });
Object.defineProperty(exports, "CellClickedEvent", { enumerable: true, get: function () { return event_1.CellClickedEvent; } });
Object.defineProperty(exports, "HeadingClickedEvent", { enumerable: true, get: function () { return event_1.HeadingClickedEvent; } });
var range_1 = require("./range");
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
        this.heading = function (c, i) {
            return getHeadingView(_this.table, new NewHeadingContext(_this.table, _this, c, i), c).render();
        };
    }
    return NewHeadContext;
}());
exports.NewHeadContext = NewHeadContext;
/**
 * NewHeadingContext
 */
var NewHeadingContext = /** @class */ (function () {
    function NewHeadingContext(table, headContext, column, index) {
        var _this = this;
        this.table = table;
        this.headContext = headContext;
        this.column = column;
        this.index = index;
        this.className = util_1.concat(exports.DATA_TABLE_HEADING, (this.table.attrs.ww && this.table.attrs.ww.headingClassName || ''), this.column.headingClassName, getSortClassName(this.table.values.sortKey, this.index));
        this.onclick = function (_) {
            if (_this.column.sort)
                _this.table.values.sort(_this.index);
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
        this.cell = function (c, id, row) {
            return getCellView(_this.table, new NewCellContext(_this.table, _this, c, id, row), c).render();
        };
    }
    return NewBodyContext;
}());
exports.NewBodyContext = NewBodyContext;
/**
 * NewCellContext
 */
var NewCellContext = /** @class */ (function () {
    function NewCellContext(table, bodyContext, spec, column, row) {
        var _this = this;
        this.table = table;
        this.bodyContext = bodyContext;
        this.spec = spec;
        this.column = column;
        this.row = row;
        this.id = cellId(this.column, this.row);
        this.className = util_1.concat(exports.DATA_TABLE_CELL, (this.table.attrs.ww && this.table.attrs.ww.cellClassName || ''), this.spec.cellClassName, getSortClassName(this.table.values.sortKey, this.column));
        this.value = path_1.unsafeGet(this.spec.name, this.table.values.dataset[0][this.row]);
        this.datum = this.table.values.dataset[0][this.row];
        this.format = this.spec.format ?
            this.spec.format :
            function (c) { return String(c == null ? '' : c); };
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
        _this.theadView = new views.EmptyView({});
        _this.tbodyView = new views.EmptyView({});
        _this.values = {
            wml: { id: 'table' },
            id: __1.getId(_this.attrs),
            className: util_1.concat(exports.DATA_TABLE, __1.getClassName(_this.attrs)),
            name: (_this.attrs.ww && _this.attrs.ww.name || ''),
            sortable: (_this.attrs.ww && (_this.attrs.ww.sortable != null)) ?
                _this.attrs.ww.sortable : true,
            sortKey: ((_this.attrs.ww && _this.attrs.ww.sortKey) ?
                _this.attrs.ww.sortKey : [-1, 1]),
            sort: function (col) {
                if (_this.values.sortable)
                    _this.sort(col);
            },
            dataset: ((_this.attrs.ww && _this.attrs.ww.data) ?
                [_this.attrs.ww.data.slice(), _this.attrs.ww.data.slice()] :
                [[], []]),
            columns: (_this.attrs.ww && _this.attrs.ww.columns) ?
                _this.attrs.ww.columns : [],
            thead: function () {
                _this.theadView = getHeadView(_this, new NewHeadContext(_this));
                return _this.theadView.render();
            },
            tbody: function () {
                _this.tbodyView = getBodyView(_this, new NewBodyContext(_this));
                return _this.tbodyView.render();
            }
        };
        return _this;
    }
    /**
     * @private
     */
    DataTable.prototype.fireChange = function () {
        if (this.attrs.ww && this.attrs.ww.onChange)
            this.attrs.ww.onChange(new event_1.DataChangedEvent(this.values.name, this.values.dataset[0].slice(), this.values.sortKey.slice()));
    };
    /**
     * update the data displayed with a new data.
     */
    DataTable.prototype.update = function (data) {
        this.values.dataset = [data.slice(), data.slice()];
        this.view.invalidate();
        this.fireChange();
        return this;
    };
    /**
     * updateWithSortKey is like update but will set the sort key as well.
     */
    DataTable.prototype.updateWithSortKey = function (data, key) {
        this.values.sortKey = key;
        this.update(data);
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
        var _a = this.values, sortKey = _a.sortKey, dataset = _a.dataset;
        var del = getSortDelegate(this);
        var _b = del(new sort_1.SortRequest(id, dataset[1], sortKey)), data = _b[0], key = _b[1];
        this.values.dataset[0] = data;
        this.values.sortKey = key;
        this.view.invalidate();
        this.fireChange();
        return this;
    };
    /**
     * getRow returns a Range of HTMLTableCellElements for the row
     * that matches the provided id.
     *
     * If no rows are found by that id, the Range will be empty.
     * In order for this method to work the body view MUST include
     * the wml:id on each <tr> element that represents a row of data.
     */
    DataTable.prototype.getRow = function (row) {
        var mTr = util_1.getById(this.tbodyView, "" + row);
        if (mTr.isNothing())
            return new range_1.RangeInstance([]);
        var tr = mTr.get();
        return new range_1.RangeInstance(array_1.make(tr.cells.length, function (n) { return tr.cells[n]; }));
    };
    /**
     * getCell provides a Range containing a cell located at the
     * intersection of the column and row.
     */
    DataTable.prototype.getCell = function (column, row) {
        var cells = this.getRow(row).cells;
        if (!cells[column])
            return new range_1.RangeInstance([]);
        return new range_1.RangeInstance([cells[column]]);
    };
    return DataTable;
}(wml_1.Component));
exports.DataTable = DataTable;
var getHeadView = function (table, ctx) {
    return (table.attrs.ww && table.attrs.ww.headFragment) ?
        table.attrs.ww.headFragment(ctx) : new views.HeadView(ctx);
};
var getHeadingView = function (table, ctx, c) {
    return c.headingFragment ? c.headingFragment(ctx) :
        (table.attrs.ww && table.attrs.ww.headingFragment) ?
            table.attrs.ww.headingFragment(ctx) : new views.HeadingView(ctx);
};
var getBodyView = function (table, ctx) {
    return (table.attrs.ww && table.attrs.ww.bodyFragment) ?
        table.attrs.ww.bodyFragment(ctx) :
        new views.BodyView(ctx);
};
var getCellView = function (table, ctx, c) {
    return c.cellFragment ? c.cellFragment(ctx) :
        (table.attrs.ww && table.attrs.ww.cellFragment) ?
            table.attrs.ww.cellFragment(ctx) :
            new views.CellView(ctx);
};
var getSortDelegate = function (table) {
    return (table.attrs.ww && table.attrs.ww.sortDelegate) ?
        table.attrs.ww.sortDelegate :
        function (r) { return sort_1.sortById(table.values.columns, r.key, [table.values.dataset[0], r.data], r.column); };
};
var getSortClassName = function (key, index) {
    return (key[0] === index) ? (key[1] === 1) ? exports.ASC : exports.DESC : '';
};
var cellId = function (column, row) { return column + "," + row; };
//# sourceMappingURL=index.js.map