import * as wml from '@quenk/wml';
import { Attrs } from '@quenk/wml';
import { AllSelectedEvent } from './AllSelectedEvent';
import { CellClickedEvent } from './CellClickedEvent';
import { RowClickedEvent } from './RowClickedEvent';
import { RowSelectedEvent } from './RowSelectedEvent';
import { HeadingClickedEvent } from './HeadingClickedEvent';
import { Table } from './Table';
export declare const TABLE = "table";
export { Table, CellClickedEvent, RowClickedEvent, HeadingClickedEvent, AllSelectedEvent };
export { Cell } from './Cell';
export declare const ASC_ARROW = "⇧";
export declare const DESC_ARROW = "⇩";
export declare const THEAD = "thead";
export declare const TBODY = "tbody";
/**
 * Comparable represents those types that we know how to compare.
 */
export declare type Comparable = string | number | boolean;
/**
 * SortingStrategy is a function that can indicate the rank of
 * a to b.
 */
export declare type SortingStrategy = (a: Comparable, b: Comparable) => number;
/**
 * Column (old name for Column)
 * @deprecated
 */
export interface Column<C, R> {
    name: string;
    heading: string;
    hidden?: boolean;
    sortAs?: string;
    fragment?: CellFragment<C, R>;
    strategy?: SortingStrategy;
}
/**
 * CellFragment is a wml function that renders the DOM for a table cell.
 */
export declare type CellFragment<C, R> = (datum: C) => (name: string) => (row: R) => wml.Template;
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
        class?: string;
        theadClass?: string;
        tbodyClass?: string;
        thClass?: string;
        trClass?: string;
        tdClass?: string;
        selectable?: boolean;
        columns: Column<C, R>[];
        data: R[];
        delegate?: Delegate<C, R>;
        empty?: wml.Template;
        thead?: THead<C, R>;
        tbody?: TBody<C, R>;
        onAllSelected?: (e: AllSelectedEvent<R>) => void;
        onCellClicked?: (e: CellClickedEvent<C, R>) => void;
        onHeadingClicked?: (e: HeadingClickedEvent) => void;
        onRowClicked?: (e: RowClickedEvent<R>) => void;
        onRowSelected?: (e: RowSelectedEvent<R>) => void;
    };
}
/**
 * THead produces the content of the <thead> section.
 *
 * It should begin with the <thead> and assign the `wml:id=THEAD` attribute, otherwise
 * the dynamic features of the Table won't work.
 */
export declare type THead<C, R> = (table: Table<C, R>) => (columns: Column<C, R>[]) => wml.Template;
/**
 * TBody produces the content of the <tbody> section.
 *
 * It should begin with the <tbody> tag and assign the `wml:id=TBODY` attribute,
 * otherwise the dynamic features of the Table won't work.
 */
export declare type TBody<C, R> = (table: Table<C, R>) => (data: R[]) => (columns: Column<C, R>[]) => wml.Template;
/**
 * TableValues are the values Table makes available to templates.
 */
export interface TableValues<C, R> {
    /**
     * sortedOn indicates the column the table is sorted on.
     */
    sortedOn: string;
    /**
     * data used to build the rows of the table.
     */
    data: R[];
    /**
     * columns specs for the table.
     */
    columns: Column<C, R>[];
    /**
     * arrows is a unicode character used to indicate the sort direction.
     */
    arrow: string;
    /**
     * empty Template to use when the Table has no data.
     */
    empty: wml.Template;
    /**
     * options for the table.
     */
    options: {
        /**
         * indicates whether the table should display checkboxes for each row.
         * @deprecated
         */
        selectable: boolean;
    };
    /**
     * table specific values.
     */
    table: {
        /**
         * id is the wml:id assigned to the <table>.
         */
        id: string;
        /**
         * class names for the <table>.
         */
        class: string;
        /**
         * thead specific values.
         */
        thead: {
            /**
             * id is the wml:id assigned to the <thead>.
             */
            id: string;
            /**
             * class for the <thead> section.
             */
            class: string;
            /**
             * template for rendering the <thead>
             */
            template: THead<C, R>;
            /**
             * onCheck is called each time the 'select all' check box is toggle.
             */
            onCheck: () => void;
            /**
             * th specific values.
             */
            th: {
                /**
                 * class names for <th>.
                 */
                class: string;
                /**
                 * onClick is called each time a table heading is clicked.
                 */
                onclick: (field: string) => void;
            };
        };
        /**
         * tbody specific values.
         */
        tbody: {
            /**
             * id is the wml:id assigned to the <tbody>.
             */
            id: string;
            /**
             * template for genrating the <tbody>.
             */
            template: TBody<C, R>;
            /**
             * tr specific values.
             */
            tr: {
                /**
                 * class names for the <tr>
                 */
                class: string;
                /**
                 * onclick is called each time a <tr> is clicked in the <tbody>.
                 */
                onclick: (row: R, index: number, data: R[]) => () => void;
                /**
                 * onCheck is called when the checkbox for the <tr> is toggled.
                 */
                onCheck: (row: R, index: number, data: R[]) => () => void;
            };
            /**
             * td specific values
             */
            td: {
                /**
                 * id generates the id for a <td>
                 */
                id: (column: string, colNumber: number, rowNumber: number) => string;
                /**
                 * class names for a <td>
                 */
                class: string;
                /**
                 * onclick is called when a <td> is clicked on.
                 */
                onclick: (value: C, column: string, rowData: R, rowNumber: number) => (e: Event) => void;
            };
        };
    };
}
export declare const dateSort: (a: string, b: string) => 0 | 1 | -1;
export declare const stringSort: (a: string, b: string) => 0 | 1 | -1;
export declare const naturalSort: (a?: any, b?: any) => 0 | 1 | -1;
export declare const numberSort: (a: any, b: any) => 0 | 1 | -1;
