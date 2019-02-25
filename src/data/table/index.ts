import * as views from './wml/table';
import { get } from '@quenk/noni/lib/data/record/path';
import { Record } from '@quenk/noni/lib/data/record';
import {  Fun, Component, Content } from '@quenk/wml';
import { concat } from '../../util';
import {
    WidgetAttrs,
    HTMLElementAttrs,
    getId,
    getClassName,
    textNode
} from '../../';

///classNames:begin
export const DATA_TABLE = 'ww-data-table';
///classNames:end

export const ASC_ARROW = '\u21e7';
export const DESC_ARROW = '\u21e9';
export const THEAD = 'thead';
export const TBODY = 'tbody';

/**
 * Comparable represents those types that we know how to compare.
 */
export type Comparable
    = string
    | number
    | boolean
    ;

/**
 * SortingStrategy is a function that can indicate the rank of
 * a to b.
 */
export type SortingStrategy = (a: Comparable, b: Comparable) => number;

/**
 * THead type.
 *
 * It should begin with the <thead> and assign the 
 * `wml:id=THEAD` attribute, otherwise
 * the dynamic features of the Table won't work.
 */
export type THead<C, R extends Record<C>>
    = (table: DataTable<C, R>) => (columns: Column<C, R>[]) => Fun
    ;

/**
 * TBody type.
 *
 * It should begin with the <tbody> tag and assign the `wml:id=TBODY` attribute,
 * otherwise the dynamic features of the Table won't work.
 */
export type TBody<C, R extends Record<C>>
    = (table: DataTable<C, R>) => (data: R[]) => (columns: Column<C, R>[]) => Fun
    ;

/**
 * CellFragment type.
 *
 * Is a wml function that renders the DOM for a table cell.
 */
export type CellFragment<C, R extends Record<C>>
    = (value: C) => (name: string) => (row: R) => Fun
    ;

/**
 * Column 
 */
export interface Column<C, R extends Record<C>> {

    name: string;

    heading: string;

    hidden?: boolean;

    sortAs?: string;

    fragment?: CellFragment<C, R>

    strategy?: SortingStrategy

}

/**
 * Delegate is the interface that receives Table events.
 */
export interface Delegate {

    onCellClicked(e: CellClickedEvent): void;

    onHeadingClicked(e: HeadingClickedEvent): void;

    onRowClicked(e: RowClickedEvent): void;

}

/**
 * DataTableAttrs
 */
export interface DataTableAttrs<C, R extends Record<C>> extends HTMLElementAttrs {

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

    theadClassName?: string,
    tbodyClassName?: string,
    thClassName?: string,
    trClassName?: string,
    tdClassName?: string,
    columns: Column<C, R>[],
    data: R[],
    delegate?: Delegate,
    thead?: THead<C, R>,
    tbody?: TBody<C, R>,
    onCellClicked?: (e: CellClickedEvent) => void,
    onHeadingClicked?: (e: HeadingClickedEvent) => void,
    onRowClicked?: (e: RowClickedEvent) => void,

}

/**
 * CellClickedEvent triggered when whitespace in a cell is clicked.
 */
export class CellClickedEvent {

    constructor(public column: string, public row: number) { }

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
 * DefaultDelegate will handle table events if no Delegate is 
 * specified.
 *
 * It passes it's events onto registered callbacks.
 */
export class DefaultDelegate<C, R extends Record<C>> implements Delegate {

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

    delegate: Delegate = (this.attrs.ww && this.attrs.ww.delegate) ?
        this.attrs.ww.delegate : new DefaultDelegate(this);

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

                template: (): THead<C, R> => ((this.attrs.ww && this.attrs.ww.thead) ?
                    this.attrs.ww.thead : views.thead),

                th: {

                    className: this.attrs.ww && this.attrs.ww.thClassName,

                    content: (col: Column<C, R>) => textNode(col.heading),

                    onclick: (field: string) => () => {
                        this.delegate.onHeadingClicked(new HeadingClickedEvent(field))
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

                    className: this.attrs.ww && this.attrs.ww.tdClassName,

                    onclick: (column: string) => (row: number) => () =>
                        this.delegate.onCellClicked(
                            new CellClickedEvent(column, row)),

                    content: (r: R) => (c: Column<C, R>) => {

                        let value = get(c.name, r).get();

                        if (c.fragment) {

                            return c.fragment(value)(c.name)(r)(this.view);

                        } else {

                            return [textNode('' + value)];

                        }

                    }

                }

            }

        },
        sort: {

            key: '',

            arrow: '',

            original: (this.attrs.ww && this.attrs.ww.data) ?
                this.attrs.ww.data : []

        },
        columns: (this.attrs.ww && this.attrs.ww.columns) ?
            this.attrs.ww.columns : []

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
    setData(data: R[]): DataTable<C, R> {

        this.values.table.data = data;
        this.view.invalidate();
        return this;

    }

}

export const dateSort = (a: string, b: string) => {
    let na = new Date(a).getTime();
    let nb = new Date(b).getTime();
    return na > nb ? -1 : na < nb ? 1 : 0;
};

export const stringSort = (a: string, b: string) => {

    let la = String(a).replace(/\s+/, '').toLowerCase();
    let lb = String(b).replace(/\s+/, '').toLowerCase();

    return (la > lb) ? -1 : (la < lb) ? 1 : 0;

};

export const naturalSort = (a: any = '', b: any = '') => {

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
        } else {
            return aA > bA ? -1 : 1;
        }
    } else if (isNaN(AInt)) { //A is not an Int
        return -1; //to make alphanumeric sort first return -1 here
    } else if (isNaN(BInt)) { //B is not an Int
        return 1; //to make alphanumeric sort first return 1 here
    } else {
        return AInt > BInt ? -1 : 1;
    }

};

export const numberSort = (a: any, b: any) => {

    let na = parseFloat(a);
    let nb = parseFloat(b);

    na = (isNaN(a)) ? -Infinity : a;
    nb = (isNaN(b)) ? -Infinity : b;

    return (na > nb) ? -1 : (na < nb) ? 1 : 0;

};

const idTD = (column: string) => (colNumber: number) => (rowNumber: number) =>
    `${column}${colNumber},${rowNumber}`;
