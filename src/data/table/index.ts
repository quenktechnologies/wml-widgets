import * as views from './wml/table';

import { View, Component, Content } from '@quenk/wml';
import { Record } from '@quenk/noni/lib/data/record';
import { make } from '@quenk/noni/lib/data/array';
import { unsafeGet } from '@quenk/noni/lib/data/record/path';

import { concat, getById } from '../../util';
import { HTMLElementAttrs, getId, getClassName } from '../../';
import { Updatable } from '../updatable';
import {
    SortDelegate,
    SortRequest,
    sortById,
    Dataset,
    SortKey
} from './column/sort';
import { Column } from './column';
import {
    DataChangedEvent,
    CellClickedEvent,
    HeadingClickedEvent,
    RowId,
    ColumnId
} from './event';
import {
    HeadFragment,
    HeadingFragment,
    HeadContext,
    HeadingContext
} from './head';
import { BodyFragment, CellFragment, BodyContext, CellContext } from './body';
import { Range, RangeInstance } from './range';

export {
    SortKey,
    SortDelegate,
    SortRequest,
    HeadFragment,
    HeadContext,
    HeadingFragment,
    HeadingContext,
    BodyFragment,
    BodyContext,
    CellFragment,
    CellContext,
    Column,
    DataChangedEvent,
    CellClickedEvent,
    HeadingClickedEvent
};

///classNames:begin
export const DATA_TABLE = 'ww-data-table';
export const DATA_TABLE_HEAD = 'ww-data-table__head';
export const DATA_TABLE_HEADING = 'ww-data-table__heading';
export const DATA_TABLE_BODY = 'ww-data-table__body';
export const DATA_TABLE_CELL = 'ww-data-table__cell';
export const ASC = '-asc';
export const DESC = '-desc';
///classNames:end

/**
 * TableName indicates the name of a table.
 */
export type TableName = string;

/**
 * DataTableAttrs
 */
export interface DataTableAttrs<C, R extends Record<C>>
    extends HTMLElementAttrs {
    /**
     * name of the table.
     */
    name?: TableName;

    /**
     * headClassName
     */
    headClassName?: string;

    /**
     * headFragment if specified, will be used to render the <thead> section
     * and its contents.
     */
    headFragment?: HeadFragment<C, R>;

    /**
     * headingClassName
     */
    headingClassName?: string;

    /**
     * headingFragment can be specified to customise the rending
     * of the heading content.
     */
    headingFragment?: HeadingFragment<C, R>;

    /**
     * onHeadingClicked event handler.
     */
    onHeadingClicked?: (e: HeadingClickedEvent) => void;

    /**
     * bodyClassName
     */
    bodyClassName?: string;

    /**
     * bodyFragment if specified, will be used to render the <tbody> section
     * and its contents.
     */
    bodyFragment?: BodyFragment<C, R>;

    /**
     * cellClassName
     */
    cellClassName?: string;

    /**
     * cellFragment can be specified to customise the rendering
     * of the cell content.
     */
    cellFragment?: CellFragment<C, R>;

    /**
     * onCellClicked event handler.
     */
    onCellClicked?: (e: CellClickedEvent) => void;

    /**
     * sortable indicates whether sorting is enabled for the table.
     *
     * Default true.
     */
    sortable?: boolean;

    /**
     * sortKey can be specified to indicate the data has been presorted.
     */
    sortKey?: SortKey;

    /**
     * sortDelegate can be provided to override the default sort behaviour.
     */
    sortDelegate?: SortDelegate<R>;

    /**
     * columns list used to structure the table.
     */
    columns?: Column<C, R>[];

    /**
     * data list used to populate table data.
     */
    data?: R[];

    /**
     * onChange handler.
     *
     * Fired whenever the internal data representation changes.
     */
    onChange?: (e: DataChangedEvent<R>) => void;
}

/**
 * NewHeadContext
 */
export class NewHeadContext<C, R extends Record<C>> {
    constructor(
        public table: DataTable<C, R>,
        public className = concat(
            DATA_TABLE_HEAD,
            (table.attrs && table.attrs.headClassName) || ''
        ),
        public columns = table.values.columns,

        public data = table.values.dataset[0]
    ) {}

    heading = (c: Column<C, R>, i: number): Content =>
        getHeadingView(
            this.table,
            new NewHeadingContext(this.table, this, c, i),
            c
        ).render();
}

/**
 * NewHeadingContext
 */
export class NewHeadingContext<C, R extends Record<C>> {
    constructor(
        public table: DataTable<C, R>,
        public headContext: HeadContext<C, R>,
        public column: Column<C, R>,
        public index: number,
        public className = concat(
            DATA_TABLE_HEADING,
            (table.attrs && table.attrs.headingClassName) || '',
            <string>column.headingClassName,
            getSortClassName(table.values.sortKey, index)
        )
    ) {}

    onclick = (_: Event) => {
        if (this.column.sort) this.table.values.sort(this.index);

        if (this.column.onHeadingClicked)
            this.column.onHeadingClicked(new HeadingClickedEvent(this.index));

        if (this.table.attrs && this.table.attrs.onHeadingClicked)
            this.table.attrs.onHeadingClicked(
                new HeadingClickedEvent(this.index)
            );
    };
}

/**
 * NewBodyContext
 */
export class NewBodyContext<C, R extends Record<C>> {
    constructor(
        public table: DataTable<C, R>,
        public className = concat(
            DATA_TABLE_BODY,
            (table.attrs && table.attrs.bodyClassName) || ''
        ),
        public columns = table.values.columns,
        public data = table.values.dataset[0]
    ) {}

    cell = (c: Column<C, R>, id: number, row: number): Content =>
        getCellView(
            this.table,
            new NewCellContext(this.table, this, c, id, row),
            c
        ).render();
}

/**
 * NewCellContext
 */
export class NewCellContext<C, R extends Record<C>> {
    constructor(
        public table: DataTable<C, R>,
        public bodyContext: BodyContext<C, R>,
        public spec: Column<C, R>,
        public column: number,
        public row: number,
        public id = cellId(column, row),
        public className = concat(
            DATA_TABLE_CELL,
            (table.attrs && table.attrs.cellClassName) || '',
            <string>spec.cellClassName,
            getSortClassName(table.values.sortKey, column)
        ),
        public value = unsafeGet(spec.name, table.values.dataset[0][row]),
        public datum = table.values.dataset[0][row],
        public format = spec.format
            ? spec.format
            : (c: C) => String(c == null ? '' : c)
    ) {}

    onclick = () => {
        if (this.spec.onCellClicked)
            this.spec.onCellClicked(
                new CellClickedEvent(this.column, this.row)
            );

        if (this.table.attrs && this.table.attrs.onCellClicked)
            this.table.attrs.onCellClicked(
                new CellClickedEvent(this.column, this.row)
            );
    };
}

/**
 * DataTable can be used for displaying sortable
 * tabular data.
 */
export class DataTable<C, R extends Record<C>>
    extends Component<DataTableAttrs<C, R>>
    implements Updatable<R>
{
    view: View = new views.Main(this);

    theadView: View = new views.EmptyView({});

    tbodyView: View = new views.EmptyView({});

    values = {
        wml: { id: 'table' },

        id: getId(this.attrs),

        className: concat(DATA_TABLE, getClassName(this.attrs)),

        name: (this.attrs && this.attrs.name) || '',

        sortable:
            this.attrs && this.attrs.sortable != null
                ? this.attrs.sortable
                : true,

        sortKey: <SortKey>(
            (this.attrs && this.attrs.sortKey ? this.attrs.sortKey : [-1, 1])
        ),

        sort: (col: ColumnId) => {
            if (this.values.sortable) this.sort(col);
        },
        dataset: <Dataset<R>>(
            (this.attrs && this.attrs.data
                ? [this.attrs.data.slice(), this.attrs.data.slice()]
                : [[], []])
        ),

        columns: this.attrs && this.attrs.columns ? this.attrs.columns : [],

        thead: (): Content => {
            this.theadView = getHeadView(this, new NewHeadContext(this));
            return this.theadView.render();
        },

        tbody: (): Content => {
            this.tbodyView = getBodyView(this, new NewBodyContext(this));
            return this.tbodyView.render();
        }
    };

    /**
     * @private
     */
    fireChange(): void {
        if (this.attrs && this.attrs.onChange)
            this.attrs.onChange(
                new DataChangedEvent(
                    this.values.name,
                    this.values.dataset[0].slice(),
                    <SortKey>this.values.sortKey.slice()
                )
            );
    }

    /**
     * update the data displayed with a new data.
     */
    update(data: R[]): DataTable<C, R> {
        this.values.dataset = [data.slice(), data.slice()];

        this.view.invalidate();

        this.fireChange();

        return this;
    }

    /**
     * updateWithSortKey is like update but will set the sort key as well.
     */
    updateWithSortKey(data: R[], key: SortKey): DataTable<C, R> {
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
    sort(id: number): DataTable<C, R> {
        let { sortKey, dataset } = this.values;

        let del = getSortDelegate(this);

        let [data, key] = del(new SortRequest(id, dataset[1], sortKey));

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
    getRow(row: RowId): Range {
        let mTr = getById<HTMLTableRowElement>(this.tbodyView, `${row}`);

        if (mTr.isNothing()) return new RangeInstance([]);

        let tr = mTr.get();

        return new RangeInstance(
            make(tr.cells.length, (n: number) => tr.cells[n])
        );
    }

    /**
     * getCell provides a Range containing a cell located at the
     * intersection of the column and row.
     */
    getCell(column: ColumnId, row: RowId): Range {
        let cells = this.getRow(row).cells;

        if (!cells[column]) return new RangeInstance([]);

        return new RangeInstance([cells[column]]);
    }
}

const getHeadView = <C, R extends Record<C>>(
    table: DataTable<C, R>,
    ctx: HeadContext<C, R>
) =>
    table.attrs && table.attrs.headFragment
        ? table.attrs.headFragment(ctx)
        : new views.HeadView(ctx);

const getHeadingView = <C, R extends Record<C>>(
    table: DataTable<C, R>,
    ctx: HeadingContext<C, R>,
    c: Column<C, R>
) =>
    c.headingFragment
        ? c.headingFragment(ctx)
        : table.attrs && table.attrs.headingFragment
          ? table.attrs.headingFragment(ctx)
          : new views.HeadingView(ctx);

const getBodyView = <C, R extends Record<C>>(
    table: DataTable<C, R>,
    ctx: BodyContext<C, R>
) =>
    table.attrs && table.attrs.bodyFragment
        ? table.attrs.bodyFragment(ctx)
        : new views.BodyView(ctx);

const getCellView = <C, R extends Record<C>>(
    table: DataTable<C, R>,
    ctx: CellContext<C, R>,
    c: Column<C, R>
) =>
    c.cellFragment
        ? c.cellFragment(ctx)
        : table.attrs && table.attrs.cellFragment
          ? table.attrs.cellFragment(ctx)
          : new views.CellView(ctx);

const getSortDelegate = <C, R extends Record<C>>(
    table: DataTable<C, R>
): SortDelegate<R> =>
    table.attrs && table.attrs.sortDelegate
        ? table.attrs.sortDelegate
        : (r: SortRequest<R>) =>
              sortById(
                  table.values.columns,
                  r.key,
                  [table.values.dataset[0], r.data],
                  r.column
              );

const getSortClassName = (key: SortKey, index: number) =>
    key[0] === index ? (key[1] === 1 ? ASC : DESC) : '';

const cellId = (column: ColumnId, row: RowId) => `${column},${row}`;
