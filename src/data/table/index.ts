import * as views from './wml/table';
import { get } from '@quenk/noni/lib/data/record/path';
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

export const ASC_ARROW = '\u21e7';
export const DESC_ARROW = '\u21e9';

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
    = (value: C) => (name: string) => (row: R) => Fun
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
     *
     * headingFragment can be specified to customise the rending
     * of the heading content.
     */
    headingFragment?: HeadingFragment<C, R>,

    /**
     * cellFragment can be specified to customise the rendering
     * of the cell content.
     */
    cellFragment?: CellFragment<C, R>

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
 * DataTable provides a smarter html table.
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

            data: (this.attrs.ww && this.attrs.ww.data) ? this.attrs.ww.data : [],

            get: (column: string) => (row: number) =>
                get(column, <Record<C>>this.values.table.data[row]).get(),

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

                    content: (r: R) => (c: Column<C, R>) => {

                        let maybeValue = get(c.name, r);

                        if (maybeValue.isNothing()) {

                            return [text('')];

                        } else {

                          let value = maybeValue.get();

                            if (c.cellFragment) {

                                return c.cellFragment(value)(c.name)(r)(this.view);

                            } else {

                              if(c.format)
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
     * setData updates the table with new dataset.
     */
    setData(data: R[]): DataTable<C, R> {

        this.values.table.data = data;
        this.view.invalidate();
        return this;

    }

}

const idTD = (column: string) => (colNumber: number) => (rowNumber: number) =>
    `${column}${colNumber},${rowNumber}`;
