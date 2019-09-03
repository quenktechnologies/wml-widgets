import { View, Component, Content } from '@quenk/wml';
import { Record } from '@quenk/noni/lib/data/record';
import { Sorter } from '@quenk/noni/lib/data/array/sort';
import { WidgetAttrs, HTMLElementAttrs } from '../../';
export declare const DATA_TABLE = "ww-data-table";
export declare const DATA_TABLE_HEAD = "ww-data-table__head";
export declare const DATA_TABLE_HEADING = "ww-data-table__heading";
export declare const DATA_TABLE_BODY = "ww-data-table__body";
export declare const DATA_TABLE_CELL = "ww-data-table__cell";
export declare const ASC = "-asc";
export declare const DESC = "-desc";
/**
 * Path type.
 *
 * Refers to path notation.
 */
export declare type Path = string;
/**
 * SortAlias type.
 *
 * This is a path that should be used instead of the name field when
 * retrieving a column's sort target.
 */
export declare type SortAlias = string;
/**
 * SortKey stores the column id and direction data has been sorted by.
 */
export declare type SortKey = [number, -1 | 1];
/**
 * SortStrategy is a function that can be used to sort data or a
 * string refernece to one.
 */
export declare type SortStrategy<C> = string | Sorter<C>;
/**
 * HeadFragment type.
 */
export declare type HeadFragment<C, R extends Record<C>> = (c: HeadContext<C, R>) => View;
/**
 * HeadingFragment type.
 */
export declare type HeadingFragment<C, R extends Record<C>> = (c: HeadingContext<C, R>) => View;
/**
 * BodyFragment type.
 */
export declare type BodyFragment<C, R extends Record<C>> = (c: BodyContext<C, R>) => View;
/**
 * CellFragment type.
 */
export declare type CellFragment<C, R extends Record<C>> = (c: CellContext<C, R>) => View;
/**
 * HeadContext
 */
export interface HeadContext<C, R extends Record<C>> {
    /**
     * className for the <thead>
     */
    className: string;
    /**
     * columns used to generate the headings.
     */
    columns: Column<C, R>[];
    /**
     * data supplied to the table.
     */
    data: R[];
    /**
     * heading generates the heading cell from a column spec.
     */
    heading: (c: Column<C, R>) => (n: number) => Content;
}
/**
 * HeadingContext
 */
export interface HeadingContext<C, R extends Record<C>> {
    /**
     * className
     */
    className: string;
    /**
     * column used to generate the heading.
     */
    column: Column<C, R>;
    /**
     * columns used to generate the headings.
     */
    columns: Column<C, R>[];
    /**
     * data supplied to the table.
     */
    data: R[];
    /**
     * onclick handler
     */
    onclick: (e: Event) => void;
}
/**
 * BodyContext
 */
export interface BodyContext<C, R extends Record<C>> {
    /**
     * className for the <tbody>
     */
    className: string;
    /**
     * columns used to generate the body cells.
     */
    columns: Column<C, R>[];
    /**
     * data supplied to the table.
     */
    data: R[];
    /**
     * cell generates a cell from a column spec.
     */
    cell: (c: Column<C, R>) => (idx: number) => (row: number) => Content;
}
/**
 * CellContext
 */
export interface CellContext<C, R extends Record<C>> {
    /**
     * className
     */
    className: string;
    /**
     * column indicates the index of the column used to render the cell.
     */
    column: number;
    /**
     * row indicates the row of data the cell value belongs to.
     */
    row: number;
    /**
     * value for the cell.
     */
    value: C;
    /**
     * datum is the entire record of data the cell value comes from.
     */
    datum: R;
    /**
     * format turns a cell value into a string.
     */
    format: (c: C) => string;
    /**
     * onclick handler
     */
    onclick: (e: Event) => void;
}
/**
 * Column provides the information a DataTable needs to render the cells
 * of a column in each row.
 */
export interface Column<C, R extends Record<C>> {
    /**
     * name of the property to use for this column.
     *
     * Can be a name or path expression.
     */
    name: Path;
    /**
     * heading displayed for the column.
     */
    heading: string;
    /**
     * headingClassName will be appended to the column's class list.
     */
    headingClassName?: string;
    /**
     * cellClassName will be appended to each cell's class list.
     */
    cellClassName?: string;
    /**
     * format can be specified to transform the stringified value of each cell
     * before display.
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
     * alias specifies the path that should be used when sorting by this column.
     */
    alias?: SortAlias;
    /**
     * sort indicates how to sort by the column.
     *
     * If this is specified, sorting by the column will be enabled.
     */
    sort?: SortStrategy<C>;
}
/**
 * DataTableAttrs
 */
export interface DataTableAttrs<C, R extends Record<C>> extends HTMLElementAttrs {
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
     * sortKey can be specified to indicate the data has been presorted.
     */
    sortKey?: SortKey;
    /**
     * columns list used to structure the table.
     */
    columns: Column<C, R>[];
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
 * HeadingClicked is triggered when the user clicks on
 * one of the column headings.
 */
export declare class HeadingClickedEvent {
    column: number;
    constructor(column: number);
}
/**
 * CellClickedEvent triggered when a cell is clicked on.
 */
export declare class CellClickedEvent {
    column: number;
    row: number;
    constructor(column: number, row: number);
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
    column: Column<C, R>;
    index: number;
    constructor(table: DataTable<C, R>, column: Column<C, R>, index: number);
    className: string;
    columns: Column<C, R>[];
    data: R[];
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
    spec: Column<C, R>;
    column: number;
    row: number;
    constructor(table: DataTable<C, R>, spec: Column<C, R>, column: number, row: number);
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
    values: {
        wml: {
            id: string;
        };
        id: string;
        className: string;
        sortKey: [number, 1 | -1];
        dataset: R[][];
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
     * setSortKey changes the internal sort key.
     */
    setSortKey(key: SortKey): DataTable<C, R>;
    /**
     * sort the table data by the column id specified.
     *
     * The data can only be sorted by one column at a time and that column
     * must specify the "sort" key.
     *
     * This method causes a repaint.
     */
    sort(id: number): DataTable<C, R>;
}
