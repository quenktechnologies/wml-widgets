import { View, Content } from '@quenk/wml';
import { Record } from '@quenk/noni/lib/data/record';
import { Column } from './column';

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
     * data provides the current data used by the table.
     */
    data: R[],

    /**
     * cell generates a cell from a column spec.
     */
    cell: (c: Column<C, R>, idx: number, row: number) => Content

}

/**
 * CellContext
 */
export interface CellContext<C, R extends Record<C>> {

    /**
     * id (wml) of the cell that can be used to retrieve the cell later.
     */
    id: string,

    /**
     * className provider.
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
     * bodyContext parent.
     */
    bodyContext: BodyContext<C, R>,

    /**
     * onclick handler
     */
    onclick: (e: Event) => void

}
