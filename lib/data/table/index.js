"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTable = exports.NewCellContext = exports.NewBodyContext = exports.NewHeadingContext = exports.NewHeadContext = exports.DESC = exports.ASC = exports.DATA_TABLE_CELL = exports.DATA_TABLE_BODY = exports.DATA_TABLE_HEADING = exports.DATA_TABLE_HEAD = exports.DATA_TABLE = exports.HeadingClickedEvent = exports.CellClickedEvent = exports.DataChangedEvent = exports.SortRequest = void 0;
const views = require("./wml/table");
const wml_1 = require("@quenk/wml");
const array_1 = require("@quenk/noni/lib/data/array");
const path_1 = require("@quenk/noni/lib/data/record/path");
const util_1 = require("../../util");
const __1 = require("../../");
const sort_1 = require("./column/sort");
Object.defineProperty(exports, "SortRequest", { enumerable: true, get: function () { return sort_1.SortRequest; } });
const event_1 = require("./event");
Object.defineProperty(exports, "DataChangedEvent", { enumerable: true, get: function () { return event_1.DataChangedEvent; } });
Object.defineProperty(exports, "CellClickedEvent", { enumerable: true, get: function () { return event_1.CellClickedEvent; } });
Object.defineProperty(exports, "HeadingClickedEvent", { enumerable: true, get: function () { return event_1.HeadingClickedEvent; } });
const range_1 = require("./range");
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
class NewHeadContext {
    constructor(table) {
        this.table = table;
        this.className = util_1.concat(exports.DATA_TABLE_HEAD, (this.table.attrs.ww && this.table.attrs.ww.headClassName || ''));
        this.columns = this.table.values.columns;
        this.data = this.table.values.dataset[0];
        this.heading = (c, i) => getHeadingView(this.table, new NewHeadingContext(this.table, this, c, i), c).render();
    }
}
exports.NewHeadContext = NewHeadContext;
/**
 * NewHeadingContext
 */
class NewHeadingContext {
    constructor(table, headContext, column, index) {
        this.table = table;
        this.headContext = headContext;
        this.column = column;
        this.index = index;
        this.className = util_1.concat(exports.DATA_TABLE_HEADING, (this.table.attrs.ww && this.table.attrs.ww.headingClassName || ''), this.column.headingClassName, getSortClassName(this.table.values.sortKey, this.index));
        this.onclick = (_) => {
            if (this.column.sort)
                this.table.values.sort(this.index);
            if (this.column.onHeadingClicked)
                this.column.onHeadingClicked(new event_1.HeadingClickedEvent(this.index));
            if (this.table.attrs.ww && this.table.attrs.ww.onHeadingClicked)
                this.table.attrs.ww.onHeadingClicked(new event_1.HeadingClickedEvent(this.index));
        };
    }
}
exports.NewHeadingContext = NewHeadingContext;
/**
 * NewBodyContext
 */
class NewBodyContext {
    constructor(table) {
        this.table = table;
        this.className = util_1.concat(exports.DATA_TABLE_BODY, (this.table.attrs.ww && this.table.attrs.ww.bodyClassName || ''));
        this.columns = this.table.values.columns;
        this.data = this.table.values.dataset[0];
        this.cell = (c, id, row) => getCellView(this.table, new NewCellContext(this.table, this, c, id, row), c).render();
    }
}
exports.NewBodyContext = NewBodyContext;
/**
 * NewCellContext
 */
class NewCellContext {
    constructor(table, bodyContext, spec, column, row) {
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
            (c) => String(c == null ? '' : c);
        this.onclick = () => {
            if (this.spec.onCellClicked)
                this.spec.onCellClicked(new event_1.CellClickedEvent(this.column, this.row));
            if (this.table.attrs.ww && this.table.attrs.ww.onCellClicked)
                this.table.attrs.ww.onCellClicked(new event_1.CellClickedEvent(this.column, this.row));
        };
    }
}
exports.NewCellContext = NewCellContext;
/**
 * DataTable can be used for displaying sortable
 * tabular data.
 */
class DataTable extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views.Main(this);
        this.theadView = new views.EmptyView({});
        this.tbodyView = new views.EmptyView({});
        this.values = {
            wml: { id: 'table' },
            id: __1.getId(this.attrs),
            className: util_1.concat(exports.DATA_TABLE, __1.getClassName(this.attrs)),
            name: (this.attrs.ww && this.attrs.ww.name || ''),
            sortable: (this.attrs.ww && (this.attrs.ww.sortable != null)) ?
                this.attrs.ww.sortable : true,
            sortKey: ((this.attrs.ww && this.attrs.ww.sortKey) ?
                this.attrs.ww.sortKey : [-1, 1]),
            sort: (col) => {
                if (this.values.sortable)
                    this.sort(col);
            },
            dataset: ((this.attrs.ww && this.attrs.ww.data) ?
                [this.attrs.ww.data.slice(), this.attrs.ww.data.slice()] :
                [[], []]),
            columns: (this.attrs.ww && this.attrs.ww.columns) ?
                this.attrs.ww.columns : [],
            thead: () => {
                this.theadView = getHeadView(this, new NewHeadContext(this));
                return this.theadView.render();
            },
            tbody: () => {
                this.tbodyView = getBodyView(this, new NewBodyContext(this));
                return this.tbodyView.render();
            }
        };
    }
    /**
     * @private
     */
    fireChange() {
        if (this.attrs.ww && this.attrs.ww.onChange)
            this.attrs.ww.onChange(new event_1.DataChangedEvent(this.values.name, this.values.dataset[0].slice(), this.values.sortKey.slice()));
    }
    /**
     * update the data displayed with a new data.
     */
    update(data) {
        this.values.dataset = [data.slice(), data.slice()];
        this.view.invalidate();
        this.fireChange();
        return this;
    }
    /**
     * updateWithSortKey is like update but will set the sort key as well.
     */
    updateWithSortKey(data, key) {
        this.values.sortKey = key;
        this.update(data);
        return this;
    }
    /**
     * sort the table data by the column id specified.
     *
     * The data can only be sorted by one column at a time and that column
     * must specify the "sort" key.
     *
     * This method causes a repaint.
     */
    sort(id) {
        let { sortKey, dataset } = this.values;
        let del = getSortDelegate(this);
        let [data, key] = del(new sort_1.SortRequest(id, dataset[1], sortKey));
        this.values.dataset[0] = data;
        this.values.sortKey = key;
        this.view.invalidate();
        this.fireChange();
        return this;
    }
    /**
     * getRow returns a Range of HTMLTableCellElements for the row
     * that matches the provided id.
     *
     * If no rows are found by that id, the Range will be empty.
     * In order for this method to work the body view MUST include
     * the wml:id on each <tr> element that represents a row of data.
     */
    getRow(row) {
        let mTr = util_1.getById(this.tbodyView, `${row}`);
        if (mTr.isNothing())
            return new range_1.RangeInstance([]);
        let tr = mTr.get();
        return new range_1.RangeInstance(array_1.make(tr.cells.length, (n) => tr.cells[n]));
    }
    /**
     * getCell provides a Range containing a cell located at the
     * intersection of the column and row.
     */
    getCell(column, row) {
        let cells = this.getRow(row).cells;
        if (!cells[column])
            return new range_1.RangeInstance([]);
        return new range_1.RangeInstance([cells[column]]);
    }
}
exports.DataTable = DataTable;
const getHeadView = (table, ctx) => (table.attrs.ww && table.attrs.ww.headFragment) ?
    table.attrs.ww.headFragment(ctx) : new views.HeadView(ctx);
const getHeadingView = (table, ctx, c) => c.headingFragment ? c.headingFragment(ctx) :
    (table.attrs.ww && table.attrs.ww.headingFragment) ?
        table.attrs.ww.headingFragment(ctx) : new views.HeadingView(ctx);
const getBodyView = (table, ctx) => (table.attrs.ww && table.attrs.ww.bodyFragment) ?
    table.attrs.ww.bodyFragment(ctx) :
    new views.BodyView(ctx);
const getCellView = (table, ctx, c) => c.cellFragment ? c.cellFragment(ctx) :
    (table.attrs.ww && table.attrs.ww.cellFragment) ?
        table.attrs.ww.cellFragment(ctx) :
        new views.CellView(ctx);
const getSortDelegate = (table) => (table.attrs.ww && table.attrs.ww.sortDelegate) ?
    table.attrs.ww.sortDelegate :
    (r) => sort_1.sortById(table.values.columns, r.key, [table.values.dataset[0], r.data], r.column);
const getSortClassName = (key, index) => (key[0] === index) ? (key[1] === 1) ? exports.ASC : exports.DESC : '';
const cellId = (column, row) => `${column},${row}`;
//# sourceMappingURL=index.js.map