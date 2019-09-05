import * as views from './wml/table';
import { View, Component, Content } from '@quenk/wml';
import { Record } from '@quenk/noni/lib/data/record';
import { unsafeGet } from '@quenk/noni/lib/data/record/path';
import { concat } from '../../util';
import {
    WidgetAttrs,
    HTMLElementAttrs,
    getId,
    getClassName
} from '../../';
import { sortById, Dataset, SortKey } from './column/sort';
import { Column } from './column';
import { DataChangedEvent, CellClickedEvent, HeadingClickedEvent } from './event';

export { Column, DataChangedEvent, CellClickedEvent, HeadingClickedEvent }

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
 * Path type.
 *
 * Refers to path notation.
 */
export type Path = string;

/**
 * HeadFragment type.
 */
export type HeadFragment<C, R extends Record<C>>
    = (c: HeadContext<C, R>) => View
    ;

/**
 * HeadingFragment type.
 */
export type HeadingFragment<C, R extends Record<C>>
    = (c: HeadingContext<C, R>) => View
    ;

/**
 * BodyFragment type.
 */
export type BodyFragment<C, R extends Record<C>>
    = (c: BodyContext<C, R>) => View
    ;

/**
 * CellFragment type.
 */
export type CellFragment<C, R extends Record<C>>
    = (c: CellContext<C, R>) => View
    ;

/**
 * HeadContext
 */
export interface HeadContext<C, R extends Record<C>> {

    /**
     * className for the <thead>
     */
    className: string,

    /**
     * columns used to generate the headings.
     */
    columns: Column<C, R>[],

    /**
     * data supplied to the table.
     */
    data: R[],

    /**
     * heading generates the heading cell from a column spec.
     */
    heading: (c: Column<C, R>) => (n: number) => Content

}

/**
 * HeadingContext
 */
export interface HeadingContext<C, R extends Record<C>> {

    /**
     * className
     */
    className: string,

    /**
     * column used to generate the heading.
     */
    column: Column<C, R>,

    /**
     * columns used to generate the headings.
     */
    columns: Column<C, R>[],

    /**
     * data supplied to the table.
     */
    data: R[],

    /**
     * onclick handler
     */
    onclick: (e: Event) => void

}

/**
 * BodyContext
 */
export interface BodyContext<C, R extends Record<C>> {

    /**
     * className for the <tbody>
     */
    className: string,

    /**
     * columns used to generate the body cells.
     */
    columns: Column<C, R>[],

    /**
     * data supplied to the table.
     */
    data: R[],

    /**
     * cell generates a cell from a column spec.
     */
    cell: (c: Column<C, R>) => (idx: number) => (row: number) => Content

}

/**
 * CellContext
 */
export interface CellContext<C, R extends Record<C>> {

    /**
     * className
     */
    className: string,

    /**
     * column indicates the index of the column used to render the cell.
     */
    column: number,

    /**
     * row indicates the row of data the cell value belongs to.
     */
    row: number,

    /**
     * value for the cell.
     */
    value: C,

    /**
     * datum is the entire record of data the cell value comes from.
     */
    datum: R,

    /**
     * format turns a cell value into a string.
     */
    format: (c: C) => string,

    /**
     * onclick handler
     */
    onclick: (e: Event) => void

}

/**
 * DataTableAttrs
 */
export interface DataTableAttrs<C, R extends Record<C>>
    extends
    HTMLElementAttrs {

    /**
     * headClassName
     */
    headClassName?: string,

    /**
     * headFragment if specified, will be used to render the <thead> section 
     * and its contents.
     */
    headFragment?: HeadFragment<C, R>,

    /**
     * headingClassName
     */
    headingClassName?: string,

    /**
     * headingFragment can be specified to customise the rending
     * of the heading content.
     */
    headingFragment?: HeadingFragment<C, R>,

    /**
     * onHeadingClicked event handler.
     */
    onHeadingClicked?: (e: HeadingClickedEvent) => void,

    /**
     * bodyClassName
     */
    bodyClassName?: string,

    /**
     * bodyFragment if specified, will be used to render the <tbody> section 
     * and its contents.
     */
    bodyFragment?: BodyFragment<C, R>,

    /**
     * cellClassName
     */
    cellClassName?: string,

    /**
     * cellFragment can be specified to customise the rendering
     * of the cell content.
     */
    cellFragment?: CellFragment<C, R>,

    /**
     * onCellClicked event handler.
     */
    onCellClicked?: (e: CellClickedEvent) => void,

    /**
     * sortable indicates whether sorting is enabled for the table.
     *
     * Default false.
     */
    sortable?: boolean,

    /**
     * sortKey can be specified to indicate the data has been presorted.
     */
    sortKey?: SortKey,

    /**
     * columns list used to structure the table.
     */
    columns?: Column<C, R>[],

    /**
     * data list used to populate table data.
     */
    data?: R[],

    /**
     * onChange handler.
     *
     * Fired whenever the internal data representation changes.
     */
    onChange?: (e: DataChangedEvent<R>) => void

}

/**
 * NewHeadContext
 */
export class NewHeadContext<C, R extends Record<C>> {

    constructor(public table: DataTable<C, R>) { }

    className = concat(DATA_TABLE_HEAD,
        (this.table.attrs.ww && this.table.attrs.ww.headClassName || ''));

    columns = this.table.values.columns;

    data = this.table.values.dataset[0];

    heading = (c: Column<C, R>) => (i: number) =>
        (getHeadingFragment(this.table, c)(new NewHeadingContext(this.table, c, i)))
            .render();

}

/**
 * NewHeadingContext
 */
export class NewHeadingContext<C, R extends Record<C>> {

    constructor(
        public table: DataTable<C, R>,
        public column: Column<C, R>,
        public index: number) { }

    className = concat(DATA_TABLE_HEADING,
        (this.table.attrs.ww && this.table.attrs.ww.headingClassName || ''),
        <string>this.column.headingClassName,
        getSortClassName(this.table.values.sortKey, this.index));

    columns = this.table.values.columns;

    data = this.table.values.dataset[0];

    onclick = (_: Event) => {

        if (this.table.values.sortable)
            this.table.sort(this.index);

        if (this.column.onHeadingClicked)
            this.column.onHeadingClicked(new HeadingClickedEvent(this.index));

        if (this.table.attrs.ww && this.table.attrs.ww.onHeadingClicked)
            this.table.attrs.ww.onHeadingClicked(
                new HeadingClickedEvent(this.index));

    }

}

/**
 * NewBodyContext
 */
export class NewBodyContext<C, R extends Record<C>> {

    constructor(public table: DataTable<C, R>) { }

    className = concat(DATA_TABLE_BODY,
        (this.table.attrs.ww && this.table.attrs.ww.bodyClassName || ''));

    columns = this.table.values.columns;

    data = this.table.values.dataset[0];

    cell = (c: Column<C, R>) => (id: number) => (row: number) =>
        (getCellFragment(this.table, c)(new NewCellContext(this.table, c, id, row)))
            .render();

}

/**
 * NewCellContext
 */
export class NewCellContext<C, R extends Record<C>> {

    constructor(
        public table: DataTable<C, R>,
        public spec: Column<C, R>,
        public column: number,
        public row: number) { }

    className = concat(DATA_TABLE_CELL,
        (this.table.attrs.ww && this.table.attrs.ww.cellClassName || ''),
        <string>this.spec.cellClassName,
        getSortClassName(this.table.values.sortKey, this.column));

    value = unsafeGet(this.spec.name, this.table.values.dataset[0][this.row]);

    datum = this.table.values.dataset[0][this.row];

    format = this.spec.format ? this.spec.format : (c: C) => String(c);

    onclick = () => {

        if (this.spec.onCellClicked)
            this.spec.onCellClicked(new CellClickedEvent(this.column, this.row));

        if (this.table.attrs.ww && this.table.attrs.ww.onCellClicked)
            this.table.attrs.ww.onCellClicked(
                new CellClickedEvent(this.column, this.row));
    }

}

/**
 * DataTable can be used for displaying sortable
 * tabular data.
 */
export class DataTable<C, R extends Record<C>>
    extends Component<WidgetAttrs<DataTableAttrs<C, R>>> {

    view: View = new views.Main(this);

    values = {

        wml: { id: 'table' },

        id: getId(this.attrs),

        className: concat(DATA_TABLE, getClassName(this.attrs)),

        sortable: (this.attrs.ww && this.attrs.ww.sortable) ?
            this.attrs.ww.sortable : false,

        sortKey: <SortKey>((this.attrs.ww && this.attrs.ww.sortKey) ?
            this.attrs.ww.sortKey : [-1, 1]),

        dataset: <Dataset<R>>((this.attrs.ww && this.attrs.ww.data) ?
            [this.attrs.ww.data.slice(), this.attrs.ww.data.slice()] :
            [[], []]),

        columns: (this.attrs.ww && this.attrs.ww.columns) ?
            this.attrs.ww.columns : [],

        thead: (): Content =>
            (getHeadFragment(this)(new NewHeadContext(this))).render(),

        tbody: (): Content =>
            (getBodyFragment(this)(new NewBodyContext(this))).render()

    }

    /**
     * @private
     */
    fireChange(): void {

        if (this.attrs.ww && this.attrs.ww.onChange)
            this.attrs.ww.onChange(new DataChangedEvent(
                this.values.dataset[0].slice()));

    }

    /**
     * update the data displayed with a new data.
     */
    update(data: R[]): DataTable<C, R> {

        this.values.dataset = [data.slice(), data.slice()];
        this.fireChange();
        this.view.invalidate();
        return this;

    }

    /**
     * setSortKey changes the internal sort key.
     */
    setSortKey(key: SortKey): DataTable<C, R> {

        this.values.sortKey = key;
        this.view.invalidate();
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

        let { columns, sortKey, dataset } = this.values;

        let [data, key] = sortById(columns, sortKey, dataset, id);

        this.values.dataset[0] = data;

        this.values.sortKey = key;

        this.fireChange();

        this.view.invalidate();

        return this;

    }

}

const getHeadFragment = <C, R extends Record<C>>(table: DataTable<C, R>) =>
    (table.attrs.ww && table.attrs.ww.headFragment) ?
        table.attrs.ww.headFragment :
        defaultHeadFragment;

const defaultHeadFragment = <C, R extends Record<C>>
    (c: HeadContext<C, R>) => new views.HeadView(c);

const getHeadingFragment = <C, R extends Record<C>>
    (table: DataTable<C, R>, c: Column<C, R>) =>
    c.headingFragment ? c.headingFragment :
        (table.attrs.ww && table.attrs.ww.headingFragment) ?
            table.attrs.ww.headingFragment :
            defaultHeadingFragment;

const defaultHeadingFragment = <C, R extends Record<C>>
    (c: HeadingContext<C, R>) => new views.HeadingView(c);

const getBodyFragment = <C, R extends Record<C>>(table: DataTable<C, R>) =>
    (table.attrs.ww && table.attrs.ww.bodyFragment) ?
        table.attrs.ww.bodyFragment :
        defaultBodyFragment;

const defaultBodyFragment = <C, R extends Record<C>>
    (c: BodyContext<C, R>) => new views.BodyView(c);

const getCellFragment = <C, R extends Record<C>>
    (table: DataTable<C, R>, c: Column<C, R>) =>
    c.cellFragment ? c.cellFragment :
        (table.attrs.ww && table.attrs.ww.cellFragment) ?
            table.attrs.ww.cellFragment :
            defaultCellFragment;

const defaultCellFragment = <C, R extends Record<C>>
    (c: CellContext<C, R>) => new views.CellView(c);

const getSortClassName = (key: SortKey, index: number) =>
    (key[0] === index) ? (key[1] === 1) ? ASC : DESC : '';
