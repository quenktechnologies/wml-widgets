import * as wml from '@quenk/wml';
import { Attrs } from '@quenk/wml';
import { AllSelectedEvent } from './AllSelectedEvent';
import { CellClickedEvent } from './CellClickedEvent';
import { RowClickedEvent } from './RowClickedEvent';
import { RowSelectedEvent } from './RowSelectedEvent';
import { HeadingClickedEvent } from './HeadingClickedEvent';
import { Table } from './Table';

///classNames:begin
export const TABLE = 'table'; //@todo un-bootstrap
///classNames:end

export { Table, CellClickedEvent, RowClickedEvent, HeadingClickedEvent, AllSelectedEvent };
export { Cell } from './Cell';

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
 * Column (old name for Column)
 * @deprecated
 */
export interface Column<C, R> {
    name: string;
    heading: string;
    hidden?: boolean;
    sortAs?: string;
    fragment?: CellFragment<C, R>
    strategy?: SortingStrategy;
}

/**
 * CellFragment is a wml function that renders the DOM for a table cell.
 */
export type CellFragment<C, R> = (datum: C) => (name: string) => (row: R) => wml.Template;

/**
 * Delegate is the interface that receives Table events.
 */
export interface Delegate<C, R> {

    onAllSelected(e: AllSelectedEvent<R>): void;
    onCellClicked(e: CellClickedEvent<C, R>): void;
    onHeadingClicked(e: HeadingClickedEvent): void;
    onRowClicked(e: RowClickedEvent<R>): void;
    onRowSelected(e: RowSelectedEvent<R>): void;

}

export interface TableAttrs<C, R> extends Attrs {

    ww: {

        class?: string,
        theadClass?: string,
        tbodyClass?: string,
        thClass?: string,
        trClass?: string,
        tdClass?: string,
        selectable?: boolean,
        columns: Column<C, R>[],
        data: R[],
        delegate?: Delegate<C, R>,
        empty?: wml.Template,
        thead?: THead<C, R>,
        tbody?: TBody<C, R>,
        onAllSelected?: (e: AllSelectedEvent<R>) => void,
        onCellClicked?: (e: CellClickedEvent<C, R>) => void,
        onHeadingClicked?: (e: HeadingClickedEvent) => void,
        onRowClicked?: (e: RowClickedEvent<R>) => void,
        onRowSelected?: (e: RowSelectedEvent<R>) => void

    }

}

/**
 * THead produces the content of the <thead> section.
 *
 * It should begin with the <thead> and assign the `wml:id=THEAD` attribute, otherwise
 * the dynamic features of the Table won't work.
 */
export type THead<C, R> = (table: Table<C, R>) => (columns: Column<C, R>[]) => wml.Template;

/**
 * TBody produces the content of the <tbody> section.
 *
 * It should begin with the <tbody> tag and assign the `wml:id=TBODY` attribute,
 * otherwise the dynamic features of the Table won't work.
 */
export type TBody<C, R> = (table: Table<C, R>) => (data: R[]) => (columns: Column<C, R>[]) => wml.Template;

/**
 * TableValues are the values Table makes available to templates.
 */
export interface TableValues<C, R> {

    /**
     * sortedOn indicates the column the table is sorted on.
     */
    sortedOn: string,

    /**
     * data used to build the rows of the table.
     */
    data: R[],

    /** 
     * columns specs for the table.
     */
    columns: Column<C, R>[],

    /**
     * arrows is a unicode character used to indicate the sort direction.
     */
    arrow: string,

    /**
     * empty Template to use when the Table has no data.
     */
    empty: wml.Template,

    /**
     * options for the table.
     */
    options: {

        /**
         * indicates whether the table should display checkboxes for each row.
         * @deprecated
         */
        selectable: boolean

    },
    /**
     * table specific values.
     */
    table: {

        /**
         * id is the wml:id assigned to the <table>.
         */
        id: string,

        /**
         * class names for the <table>.
         */
        class: string,

        /**
         * thead specific values.
         */
        thead: {

            /**
             * id is the wml:id assigned to the <thead>.
             */
            id: string,

            /**
             * class for the <thead> section.
             */
            class: string,

            /**
             * template for rendering the <thead>
             */
            template: THead<C, R>,

            /**
             * onCheck is called each time the 'select all' check box is toggle.
             */
            onCheck: () => void,

            /**
             * th specific values.
             */
            th: {

                /**
                 * class names for <th>.
                 */
                class: string,

                /**
                 * onClick is called each time a table heading is clicked.
                 */
                onclick: (field: string) => void,

            }

        },

        /**
         * tbody specific values.
         */
        tbody: {

            /**
             * id is the wml:id assigned to the <tbody>.
             */
            id: string,

            /**
             * template for genrating the <tbody>.
             */
            template: TBody<C, R>,

            /**
             * tr specific values.
             */
            tr: {

                /**
                 * class names for the <tr>
                 */
                class: string,

                /**
                 * onclick is called each time a <tr> is clicked in the <tbody>.
                 */
                onclick: (row: R, index: number, data: R[]) => () => void,

                /**
                 * onCheck is called when the checkbox for the <tr> is toggled.
                 */
                onCheck: (row: R, index: number, data: R[]) => () => void

            },
            /**
             * td specific values
             */
            td: {

                /**
                 * id generates the id for a <td>
                 */
                id: (column: string, colNumber: number, rowNumber: number) => string,

                /**
                 * class names for a <td>
                 */
                class: string,

                /**
                 * onclick is called when a <td> is clicked on.
                 */
                onclick: (value: C, column: string, rowData: R, rowNumber: number) => (e: Event) => void,

            }

        }

    },

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

