import { Record } from '@quenk/noni/lib/data/record';
import { CellClickedEvent, HeadingClickedEvent } from '../event';
import { HeadingFragment } from '../head';
import { CellFragment } from '../body';
import { SortAlias, SortStrategy } from './sort';
/**
 * Path the column gets its value from.
 */
export declare type Path = string;
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
     * headingFragment can be specified to customise the rending
     * of the heading content.
     */
    headingFragment?: HeadingFragment<C, R>;
    /**
     * onHeadingClicked event handler.
     */
    onHeadingClicked?: (e: HeadingClickedEvent) => void;
    /**
     * cellClassName will be appended to each cell's class list.
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
     * format can be specified to transform the stringified value of each cell
     * before display.
     */
    format?: (c: C) => string;
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
