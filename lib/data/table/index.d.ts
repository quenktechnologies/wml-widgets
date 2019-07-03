import * as views from './wml/table';
import { Sorter } from '@quenk/noni/lib/data/array/sort';
import { Record } from '@quenk/noni/lib/data/record';
import { Fun, Component, Content } from '@quenk/wml';
import { WidgetAttrs, HTMLElementAttrs } from '../../';
export declare const DATA_TABLE = "ww-data-table";
/**
 * THead template function type.
 */
export declare type THead<C, R extends Record<C>> = (table: DataTable<C, R>) => (columns: Column<C, R>[]) => Fun;
/**
 * TBody template function type.
 */
export declare type TBody<C, R extends Record<C>> = (table: DataTable<C, R>) => (columns: Column<C, R>[]) => (data: R[]) => Fun;
/**
 * HeadingFragment type.
 */
export declare type HeadingFragment<C, R extends Record<C>> = (column: Column<C, R>) => Fun;
/**
 * CellFragment type.
 */
export declare type CellFragment<C, R extends Record<C>> = (value: C) => (idx: number) => (row: R) => Fun;
/**
 * SortStrategy is a function that can be used to sort data or a
 * string refernece to one.
 */
export declare type SortStrategy<C> = string | Sorter<C>;
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
    headingClassName?: string;
    /**
     * cellClassName
     */
    cellClassName?: string;
    /**
     * format can be specified to transform a cell value to a string for display.
     */
    format?: (c: C) => string;
    /**
     * headingFragment can be specified to customise the rending
     * of the heading content.
     */
    headingFragment?: HeadingFragment<C, R>;
    /**
     * cellFragment can be specified to customise the rendering
     * of the cell content.
     */
    cellFragment?: CellFragment<C, R>;
    /**
     * sortOn can be used to indicate the column should be sorted
     * by another value.
     */
    sortOn?: string;
    /**
     * sortAs indicates how to sort on the column.
     *
     * Defaults to string.
     */
    sortAs?: string;
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
    /**
     * theadClassName is a class name to append to the <thead> section.
     */
    theadClassName?: string;
    /**
     * tbodyClassName is a class name to append to the <tbody> section.
     */
    tbodyClassName?: string;
    /**
     * thClassName is a class name to append to each <th> element.
     */
    thClassName?: string;
    /**
     * trClassName is a class name to append to each <tr> element.
     */
    trClassName?: string;
    /**
     * tdClassName is a class name to append to each <td> element.
     */
    tdClassName?: string;
    /**
     * columns list used to structure the table.
     */
    columns: Column<C, R>[];
    /**
     * data list used to populate table data.
     */
    data: R[];
    /**
     * thead if specified, will be used to render the <thead> section.
     */
    thead?: THead<C, R>;
    /**
     * tbody if specified will be used to render the <tbody> section.
     */
    tbody?: TBody<C, R>;
    /**
     * onCellClicked event handler.
     */
    onCellClicked?: (e: CellClickedEvent) => void;
    /**
     * onHeadingClicked event handler.
     */
    onHeadingClicked?: (e: HeadingClickedEvent) => void;
    /**
     * onRowClicked event handler.
     */
    onRowClicked?: (e: RowClickedEvent) => void;
    /**
     * onChange is applied each time the internal representation
     * of the data is changed.
     */
    onChange?: (e: DataChangedEvent<R>) => void;
    /**
     * onSort is applied each time the data is sorted.
     */
    onSort?: (e: DataSortedEvent<R>) => void;
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
 * CellClickedEvent triggered when a cell or its contents is clicked.
 */
export declare class CellClickedEvent {
    name: string;
    row: number;
    constructor(name: string, row: number);
}
/**
 * DataChangedEvent generated when the internal representation of the data
 * changes.
 */
export declare class DataChangedEvent<R> {
    data: R[];
    constructor(data: R[]);
}
/**
 * DataSortedEvent is generated when the internal representation of the
 * data has been sorted.
 * It provides a copy of the sorted data, the column name
 * and the direction (1 for ascending, -1 for descending).
 */
export declare class DataSortedEvent<R> {
    data: R[];
    column: string;
    dir: number;
    constructor(data: R[], column: string, dir: number);
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
 * @private
 */
export declare class Delegate<C, R extends Record<C>> {
    table: DataTable<C, R>;
    constructor(table: DataTable<C, R>);
    onCellClicked(e: CellClickedEvent): void;
    onHeadingClicked(e: HeadingClickedEvent): void;
    onRowClicked(e: RowClickedEvent): void;
}
/**
 * DataTable can be used for displaying sortable
 * tabular data.
 */
export declare class DataTable<C, R extends Record<C>> extends Component<WidgetAttrs<DataTableAttrs<C, R>>> {
    view: views.Main<C, R>;
    delegate: Delegate<C, R>;
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
            dir: number;
            sortedOn: string;
            pristine: R[];
            thead: {
                wml: {
                    id: string;
                };
                className: string | undefined;
                template: () => THead<C, R>;
                th: {
                    className: (c: Column<C, R>) => string;
                    content: (col: Column<C, R>) => Content[];
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
                    className: (c: Column<C, R>) => string;
                    onclick: (column: string) => (row: number) => () => void;
                    content: (idx: number) => (r: R) => (c: Column<C, R>) => Content[];
                };
            };
        };
        columns: Column<C, R>[];
    };
    /**
     * @private
     */
    fireChange(): void;
    /**
     * @private
     */
    fireSort(): void;
    /**
     * setData updates the table with new dataset.
     */
    setData(data: R[]): DataTable<C, R>;
    /**
     * sort the data on the colum specified.
     *
     * Sorting is always done using the original data
     * or the data from setData().
     */
    sort(name: string): DataTable<C, R>;
    /**
     * reverse sort the data displayed.
     */
    reverse(): DataTable<C, R>;
}
