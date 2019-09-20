import { View, Component, Content } from '@quenk/wml';
import { Record } from '@quenk/noni/lib/data/record';
import { WidgetAttrs, HTMLElementAttrs } from '../../';
import { SortDelegate, SortRequest, Dataset, SortKey } from './column/sort';
import { Column } from './column';
import { DataChangedEvent, CellClickedEvent, HeadingClickedEvent, RowId, ColumnId } from './event';
import { HeadFragment, HeadingFragment, HeadContext, HeadingContext } from './head';
import { BodyFragment, CellFragment, BodyContext, CellContext } from './body';
import { Range } from './range';
export { SortKey, SortDelegate, SortRequest, HeadFragment, HeadContext, HeadingFragment, HeadingContext, BodyFragment, BodyContext, CellFragment, CellContext, Column, DataChangedEvent, CellClickedEvent, HeadingClickedEvent };
export declare const DATA_TABLE = "ww-data-table";
export declare const DATA_TABLE_HEAD = "ww-data-table__head";
export declare const DATA_TABLE_HEADING = "ww-data-table__heading";
export declare const DATA_TABLE_BODY = "ww-data-table__body";
export declare const DATA_TABLE_CELL = "ww-data-table__cell";
export declare const ASC = "-asc";
export declare const DESC = "-desc";
/**
 * TableName indicates the name of a table.
 */
export declare type TableName = string;
/**
 * DataTableAttrs
 */
export interface DataTableAttrs<C, R extends Record<C>> extends HTMLElementAttrs {
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
export declare class NewHeadContext<C, R extends Record<C>> {
    table: DataTable<C, R>;
    constructor(table: DataTable<C, R>);
    className: string;
    columns: Column<C, R>[];
    data: R[];
    heading: (c: Column<C, R>) => (i: number) => Content;
}
/**
 * NewHeadingContext
 */
export declare class NewHeadingContext<C, R extends Record<C>> {
    table: DataTable<C, R>;
    headContext: HeadContext<C, R>;
    column: Column<C, R>;
    index: number;
    constructor(table: DataTable<C, R>, headContext: HeadContext<C, R>, column: Column<C, R>, index: number);
    className: string;
    onclick: (_: Event) => void;
}
/**
 * NewBodyContext
 */
export declare class NewBodyContext<C, R extends Record<C>> {
    table: DataTable<C, R>;
    constructor(table: DataTable<C, R>);
    className: string;
    columns: Column<C, R>[];
    data: R[];
    cell: (c: Column<C, R>) => (id: number) => (row: number) => Content;
}
/**
 * NewCellContext
 */
export declare class NewCellContext<C, R extends Record<C>> {
    table: DataTable<C, R>;
    bodyContext: BodyContext<C, R>;
    spec: Column<C, R>;
    column: number;
    row: number;
    constructor(table: DataTable<C, R>, bodyContext: BodyContext<C, R>, spec: Column<C, R>, column: number, row: number);
    id: string;
    className: string;
    value: C;
    datum: R;
    format: (c: C) => string;
    onclick: () => void;
}
/**
 * DataTable can be used for displaying sortable
 * tabular data.
 */
export declare class DataTable<C, R extends Record<C>> extends Component<WidgetAttrs<DataTableAttrs<C, R>>> {
    view: View;
    theadView: View;
    tbodyView: View;
    values: {
        wml: {
            id: string;
        };
        id: string;
        className: string;
        name: string;
        sortable: boolean;
        sortKey: [number, 1 | -1];
        sort: (col: number) => void;
        dataset: [R[], R[]];
        columns: Column<C, R>[];
        thead: () => Content;
        tbody: () => Content;
    };
    /**
     * @private
     */
    fireChange(): void;
    /**
     * update the data displayed with a new data.
     */
    update(data: R[]): DataTable<C, R>;
    /**
     * updateWithSortKey is like update but will set the sort key as well.
     */
    updateWithSortKey(dataset: Dataset<R>, key: SortKey): DataTable<C, R>;
    /**
     * sort the table data by the column id specified.
     *
     * The data can only be sorted by one column at a time and that column
     * must specify the "sort" key.
     *
     * This method causes a repaint.
     */
    sort(id: number): DataTable<C, R>;
    /**
     * getRow returns a Range of HTMLTableCellElements for the row
     * that matches the provided id.
     *
     * If no rows are found by that id, the Range will be empty.
     * In order for this method to work the body view MUST include
     * the wml:id on each <tr> element that represents a row of data.
     */
    getRow(row: RowId): Range;
    /**
     * getCell provides a Range containing a cell located at the
     * intersection of the column and row.
     */
    getCell(column: ColumnId, row: RowId): Range;
}
