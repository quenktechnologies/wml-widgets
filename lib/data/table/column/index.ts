import { View, Content } from '@quenk/wml';
import { Record } from '@quenk/noni/lib/data/record';
import { Sorter } from '@quenk/noni/lib/data/array/sort';
import { CellClickedEvent, HeadingClickedEvent } from '../event';
import { SortAlias } from './sort';

/**
 * Path type.
 *
 * Refers to path notation.
 */
export type Path = string;

/**
 * SortStrategy is a function that can be used to sort data or a 
 * string refernece to one.
 */
export type SortStrategy<C>
    = string
    | Sorter<C>
    ;

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
 * Column provides the information a DataTable needs to render the cells
 * of a column in each row.
 */
export interface Column<C, R extends Record<C>> {

    /**
     * name of the property to use for this column.
     *
     * Can be a name or path expression.
     */
    name: Path,

    /**
     * heading displayed for the column.
     */
    heading: string,

    /**
     * headingClassName will be appended to the column's class list.
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
     * cellClassName will be appended to each cell's class list.
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
     * format can be specified to transform the stringified value of each cell
     * before display.
     */
    format?: (c: C) => string,

    /**
     * alias specifies the path that should be used when sorting by this column.
     */
    alias?: SortAlias,

    /**
     * sort indicates how to sort by the column.
     *
     * If this is specified, sorting by the column will be enabled.
     */
    sort?: SortStrategy<C>

}
