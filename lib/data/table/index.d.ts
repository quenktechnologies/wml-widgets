import * as views from './wml/table';
import { Record } from '@quenk/noni/lib/data/record';
import { Fun, Component, Content } from '@quenk/wml';
import { WidgetAttrs, HTMLElementAttrs } from '../../';
export declare const DATA_TABLE = "ww-data-table";
export declare const ASC_ARROW = "\u21E7";
export declare const DESC_ARROW = "\u21E9";
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
 * THead type.
 *
 * It should begin with the <thead> and assign the
 * `wml:id=THEAD` attribute, otherwise
 * the dynamic features of the Table won't work.
 */
export declare type THead<C, R extends Record<C>> = (table: DataTable<C, R>) => (columns: Column<C, R>[]) => Fun;
/**
 * TBody type.
 *
 * It should begin with the <tbody> tag and assign the `wml:id=TBODY` attribute,
 * otherwise the dynamic features of the Table won't work.
 */
export declare type TBody<C, R extends Record<C>> = (table: DataTable<C, R>) => (data: R[]) => (columns: Column<C, R>[]) => Fun;
/**
 * CellFragment type.
 *
 * Is a wml function that renders the DOM for a table cell.
 */
export declare type CellFragment<C, R extends Record<C>> = (value: C) => (name: string) => (row: R) => Fun;
/**
 * Column
 */
export interface Column<C, R extends Record<C>> {
    name: string;
    heading: string;
    hidden?: boolean;
    sortAs?: string;
    apply?: (c: C) => C;
    fragment?: CellFragment<C, R>;
    strategy?: SortingStrategy;
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
    alternate?: boolean;
    /**
     * hoverable enables hover effect styles.
     */
    hoverable?: boolean;
    /**
     * bordered enables cell border styles.
     */
    bordered?: boolean;
    /**
     * compact will enable compact table style.
     */
    compact?: boolean;
    theadClassName?: string;
    tbodyClassName?: string;
    thClassName?: string;
    trClassName?: string;
    tdClassName?: string;
    columns: Column<C, R>[];
    data: R[];
    delegate?: Delegate;
    thead?: THead<C, R>;
    tbody?: TBody<C, R>;
    onCellClicked?: (e: CellClickedEvent) => void;
    onHeadingClicked?: (e: HeadingClickedEvent) => void;
    onRowClicked?: (e: RowClickedEvent) => void;
}
/**
 * CellClickedEvent triggered when whitespace in a cell is clicked.
 */
export declare class CellClickedEvent {
    column: string;
    row: number;
    constructor(column: string, row: number);
}
/**
 * Range of table cells.
 */
export declare class Range {
    elements: HTMLElement[];
    constructor(elements: HTMLElement[]);
    /**
     * setContent of the cells in this Range.
     */
    setContent(content: Content[]): Range;
}
/**
 * HeadingClicked is triggered when the user clicks on
 * one of the column headings.
 */
export declare class HeadingClickedEvent {
    column: string;
    constructor(column: string);
}
/**
 * RowClickedEvent is triggered when the user clicks on whitespace in
 * the row of a table.
 */
export declare class RowClickedEvent {
    row: number;
    constructor(row: number);
}
/**
 * DefaultDelegate will handle table events if no Delegate is
 * specified.
 *
 * It passes it's events onto registered callbacks.
 */
export declare class DefaultDelegate<C, R extends Record<C>> implements Delegate {
    table: DataTable<C, R>;
    constructor(table: DataTable<C, R>);
    onCellClicked(e: CellClickedEvent): void;
    onHeadingClicked(e: HeadingClickedEvent): void;
    onRowClicked(e: RowClickedEvent): void;
}
/**
 * DataTable provides a smarter html table.
 */
export declare class DataTable<C, R extends Record<C>> extends Component<WidgetAttrs<DataTableAttrs<C, R>>> {
    view: views.Main<C, R>;
    delegate: Delegate;
    values: {
        table: {
            wml: {
                id: string;
            };
            id: string;
            className: string;
            alternate: boolean | undefined;
            bordered: boolean | undefined;
            compact: boolean | undefined;
            hoverable: boolean | undefined;
            data: R[];
            get: (column: string) => (row: number) => C;
            thead: {
                wml: {
                    id: string;
                };
                className: string | undefined;
                template: () => THead<C, R>;
                th: {
                    className: string | undefined;
                    content: (col: Column<C, R>) => Text;
                    onclick: (field: string) => () => void;
                };
            };
            tbody: {
                id: string;
                template: () => TBody<C, R>;
                tr: {
                    className: string | undefined;
                    onclick: (row: number) => () => void;
                };
                td: {
                    id: (column: string) => (colNumber: number) => (rowNumber: number) => string;
                    className: string | undefined;
                    onclick: (column: string) => (row: number) => () => void;
                    content: (r: R) => (c: Column<C, R>) => Content[];
                };
            };
        };
        sort: {
            key: string;
            arrow: string;
            original: R[];
        };
        columns: Column<C, R>[];
    };
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
    setData(data: R[]): DataTable<C, R>;
}
export declare const dateSort: (a: string, b: string) => 0 | 1 | -1;
export declare const stringSort: (a: string, b: string) => 0 | 1 | -1;
export declare const naturalSort: (a?: any, b?: any) => 0 | 1 | -1;
export declare const numberSort: (a: any, b: any) => 0 | 1 | -1;
