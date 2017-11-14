/**
 * RowClickedEvent is triggered when the user clicks on whitespace in
 * the row of a table.
 */
export declare class RowClickedEvent<D> {
    value: D;
    row: number;
    data: D[];
    constructor(value: D, row: number, data: D[]);
}
