import * as views from './wml/table';
import { Type } from '@quenk/noni/lib/data/type';
import {
    Sorter,
    date as dateSort,
    string as stringSort,
    number as numberSort,
    natural as naturalSort
} from '@quenk/noni/lib/data/array/sort';
import { nothing, just } from '@quenk/noni/lib/data/maybe';
import { get, getDefault } from '@quenk/noni/lib/data/record/path';
import { Record } from '@quenk/noni/lib/data/record';
import { Fun, Component, Content } from '@quenk/wml';
import { concat } from '../../util';
import {
    WidgetAttrs,
    HTMLElementAttrs,
    getId,
    getClassName,
    text
} from '../../';

///classNames:begin
export const DATA_TABLE = 'ww-data-table';
///classNames:end

/**
 * THead template function type.
 */
export type THead<C, R extends Record<C>>
    = (table: DataTable<C, R>) => (columns: Column<C, R>[]) => Fun
    ;

/**
 * TBody template function type.
 */
export type TBody<C, R extends Record<C>>
    = (table: DataTable<C, R>) => (columns: Column<C, R>[]) => (data: R[]) => Fun
    ;

/**
 * HeadingFragment type.
 */
export type HeadingFragment<C, R extends Record<C>>
    = (column: Column<C, R>) => Fun
    ;

/**
 * CellFragment type.
 */
export type CellFragment<C, R extends Record<C>>
    = (value: C) => (idx: number) => (row: R) => Fun
    ;

/**
 * SortStrategy is a function that can be used to sort data or a 
 * string refernece to one.
 */
export type SortStrategy<C>
    = string
    | Sorter<C>
    ;
/**
 * Column provides the information a DataTable needs to render the cells
 * of a column in each row.
 */
export interface Column<C, R extends Record<C>> {

    /**
     * name of the property to retreive the value from.
     *
     * Can be a path.
     */
    name: string;

    /**
     * heading displayed for the column.
     */
    heading: string;

    /**
     * headingClassName
     */
    headingClassName?: string,

    /**
     * cellClassName
     */
    cellClassName?: string,

    /**
     * format can be specified to transform a cell value to a string for display.
     */
    format?: (c: C) => string,

    /**
     * headingFragment can be specified to customise the rending
     * of the heading content.
     */
    headingFragment?: HeadingFragment<C, R>,

    /**
     * cellFragment can be specified to customise the rendering
     * of the cell content.
     */
    cellFragment?: CellFragment<C, R>,

    /**
     * sortOn can be used to indicate the column should be sorted 
     * by another value.
     */
    sortOn?: string,

    /**
     * sortAs indicates how to sort on the column.
     *
     * Defaults to string.
     */
    sortAs?: string

}

/**
 * DataTableAttrs
 */
export interface DataTableAttrs<C, R extends Record<C>>
    extends
    HTMLElementAttrs {

    /**
     * alternate enables alternating row styling.
     */
    alternate?: boolean,

    /**
     * hoverable enables hover effect styles.
     */
    hoverable?: boolean,

    /**
     * bordered enables cell border styles.
     */
    bordered?: boolean,

    /**
     * compact will enable compact table style.
     */
    compact?: boolean,

    /**
     * theadClassName is a class name to append to the <thead> section.
     */
    theadClassName?: string,

    /**
     * tbodyClassName is a class name to append to the <tbody> section.
     */
    tbodyClassName?: string,

    /**
     * thClassName is a class name to append to each <th> element.
     */
    thClassName?: string,

    /**
     * trClassName is a class name to append to each <tr> element.
     */
    trClassName?: string,

    /**
     * tdClassName is a class name to append to each <td> element.
     */
    tdClassName?: string,

    /**
     * columns list used to structure the table.
     */
    columns: Column<C, R>[],

    /**
     * data list used to populate table data.
     */
    data: R[],

    /**
     * thead if specified, will be used to render the <thead> section.
     */
    thead?: THead<C, R>,

    /**
     * tbody if specified will be used to render the <tbody> section.
     */
    tbody?: TBody<C, R>,

    /**
     * onCellClicked event handler.
     */
    onCellClicked?: (e: CellClickedEvent) => void,

    /**
     * onHeadingClicked event handler.
     */
    onHeadingClicked?: (e: HeadingClickedEvent) => void,

    /**
     * onRowClicked event handler.
     */
    onRowClicked?: (e: RowClickedEvent) => void,

    /**
     * onChange is applied each time the internal representation
     * of the data is changed.
     */
    onChange?: (e: DataChangedEvent<R>) => void,

    /**
     * onSort is applied each time the data is sorted.
     */
    onSort?: (e: DataSortedEvent<R>) => void

}

/**
 * HeadingClicked is triggered when the user clicks on 
 * one of the column headings.
 */
export class HeadingClickedEvent {

    constructor(public column: string) { }

}

/**
 * RowClickedEvent is triggered when the user clicks on whitespace in 
 * the row of a table.
 */
export class RowClickedEvent {

    constructor(public row: number) { }

}

/**
 * CellClickedEvent triggered when a cell or its contents is clicked.
 */
export class CellClickedEvent {

    constructor(public name: string, public row: number) { }

}

/**
 * DataChangedEvent generated when the internal representation of the data
 * changes.
 */
export class DataChangedEvent<R> {

    constructor(public data: R[]) { }

}

/**
 * DataSortedEvent is generated when the internal representation of the
 * data has been sorted.
 * It provides a copy of the sorted data, the column name
 * and the direction (1 for ascending, -1 for descending).
 */
export class DataSortedEvent<R> {

    constructor(public data: R[], public column: string, public dir: number) { }

}
/**
 * Range of table cells.
 */
export class Range {

    constructor(public elements: HTMLElement[]) { }

    /**
     * setContent of the cells in this Range.
     */
    setContent(content: Content[]): Range {

        for (let i = 0; i < this.elements.length; i++) {

            let el = this.elements[i];

            while (el.lastChild)
                el.removeChild(el.lastChild);

            for (let c = 0; c < content.length; c++)
                el.appendChild(content[c]);

        }

        return this;

    }

}

/**
 * @private
 */
export class Delegate<C, R extends Record<C>>  {

    constructor(public table: DataTable<C, R>) { }

    onCellClicked(e: CellClickedEvent): void {

        if (this.table.attrs.ww && this.table.attrs.ww.onCellClicked)
            this.table.attrs.ww.onCellClicked(e);

    }

    onHeadingClicked(e: HeadingClickedEvent): void {

        if (this.table.attrs.ww && this.table.attrs.ww.onHeadingClicked)
            this.table.attrs.ww.onHeadingClicked(e);

    }

    onRowClicked(e: RowClickedEvent): void {

        if (this.table.attrs.ww && this.table.attrs.ww.onRowClicked)
            this.table.attrs.ww.onRowClicked(e);

    }

}

/**
 * DataTable can be used for displaying sortable
 * tabular data.
 */
export class DataTable<C, R extends Record<C>>
    extends Component<WidgetAttrs<DataTableAttrs<C, R>>> {

    view: views.Main<C, R> = new views.Main(this);

    delegate: Delegate<C, R> = new Delegate(this);

    values = {

        table: {

            wml: {

                id: 'table'

            },
            id: getId(this.attrs),

            className: concat(DATA_TABLE, getClassName(this.attrs)),

            alternate: (this.attrs.ww && this.attrs.ww.alternate),

            bordered: (this.attrs.ww && this.attrs.ww.bordered),

            compact: (this.attrs.ww && this.attrs.ww.compact),

            hoverable: (this.attrs.ww && this.attrs.ww.hoverable),

            data: (this.attrs.ww && this.attrs.ww.data) ?
                this.attrs.ww.data.slice() : [],

            dir: 0,

            sortedOn: '',

            pristine: (this.attrs.ww && this.attrs.ww.data) ?
                this.attrs.ww.data.slice() : [],

            thead: {

                wml: {

                    id: 'thead'

                },

                className: (this.attrs.ww && this.attrs.ww.theadClassName),

                template: (): THead<C, R> =>
                    (this.attrs.ww && this.attrs.ww.thead) ?
                        this.attrs.ww.thead : views.thead,

                th: {

                    className: (c: Column<C, R>) =>
                        concat((this.attrs.ww && this.attrs.ww.thClassName) ?
                            this.attrs.ww.thClassName : '',
                            String(c.headingClassName)),

                    content: (col: Column<C, R>) => (col.headingFragment) ?
                        col.headingFragment(col)(this.view) :
                        [text(col.heading)],

                    onclick: (field: string) => () => {

                        this.delegate.onHeadingClicked(
                            new HeadingClickedEvent(field))

                    },

                }

            },

            tbody: {

                id: 'tbody',

                template: () => (this.attrs.ww && this.attrs.ww.tbody) ?
                    this.attrs.ww.tbody : views.tbody,

                tr: {

                    className: this.attrs.ww && this.attrs.ww.trClassName,

                    onclick: (row: number) => () => {

                        this.delegate.onRowClicked(new RowClickedEvent(row))

                    },

                },
                td: {

                    id: idTD,

                    className: (c: Column<C, R>) =>
                        concat(c.cellClassName ? c.cellClassName : '',
                            (this.attrs.ww && this.attrs.ww.tdClassName) ?
                                this.attrs.ww.tdClassName : ''),

                    onclick: (column: string) => (row: number) => () =>
                        this.delegate.onCellClicked(
                            new CellClickedEvent(column, row)),

                    content: (idx: number) => (r: R) => (c: Column<C, R>) => {

                        let maybeValue = get(c.name, r);

                        if (maybeValue.isNothing()) {

                            return [text('')];

                        } else {

                            let value = maybeValue.get();

                            if (c.cellFragment) {

                                return c.cellFragment(value)(idx)(r)(this.view);

                            } else {

                                if (c.format)
                                    return [text(c.format(value))];

                                return [text('' + value)];

                            }

                        }

                    }

                }

            }

        },
        columns: (this.attrs.ww && this.attrs.ww.columns) ?
            this.attrs.ww.columns : []

    }

    /**
     * @private
     */
    fireChange(): void {

        if (this.attrs.ww && this.attrs.ww.onChange)
            this.attrs.ww.onChange(new DataChangedEvent(
                this.values.table.data.slice()));

    }

    /**
     * @private
     */
    fireSort(): void {

        if (this.attrs.ww && this.attrs.ww.onSort)
            this.attrs.ww.onSort(
                new DataSortedEvent(
                    this.values.table.data,
                    this.values.table.sortedOn,
                    this.values.table.dir));

    }

    /**
     * setData updates the table with new dataset.
     */
    setData(data: R[]): DataTable<C, R> {

        this.values.table.data = data.slice();
        this.values.table.pristine = data.slice();
        this.fireChange();
        this.view.invalidate();
        return this;

    }

    /**
     * sort the data on the colum specified.
     *
     * Sorting is always done using the original data
     * or the data from setData().
     */
    sort(name: string): DataTable<C, R> {

        let columns = this.values.columns;

        let mField = columns.reduce((p, c) =>
            p.isJust() ? p : (c.name === name) ? just(c) : p, nothing());

        if (mField.isNothing()) return this;

        let field = <Column<C, R>>mField.get();
        let sortOn = field.sortOn || name;
        let strategy = getStrategy(sortOn);

        this.values.table.sortedOn = name;
        this.values.table.dir = 1;

        this.values.table.data =
            this
                .values
                .table
                .pristine
                .slice()
                .sort((a, b) => strategy(getAny(sortOn, a), getAny(sortOn, b)));

        this.fireSort();

        this.fireChange();

        this.view.invalidate();

        return this;

    }

    /**
     * reverse sort the data displayed.
     */
    reverse(): DataTable<C, R> {

        this.values.table.data = this.values.table.data.reverse();

        this.values.table.dir = -1;

        this.fireSort();

        this.fireChange();

        this.view.invalidate();

        return this;

    }

}

const idTD = (column: string) => (colNumber: number) => (rowNumber: number) =>
    `${column}${colNumber},${rowNumber}`;

const getAny = <C>(path: string, src: Record<C>) =>
    getDefault(path, src, undefined);

const getStrategy = (s: SortStrategy<Type>): Sorter<Type> => {

    if (typeof s === 'function')
        return s;
    else if (s === 'date')
        return dateSort;
    else if (s === 'number')
        return numberSort;
    else if (s === 'string')
        return stringSort
    else (s === 'natural')
    return naturalSort;

}
