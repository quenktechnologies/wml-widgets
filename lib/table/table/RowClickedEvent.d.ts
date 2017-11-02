/**
 * RowClickedEvent is triggered when the user clicks on whitespace in
 * the row of a table.
 */
export declare class RowClickedEvent<D> {
    value: D;
    index: number | string;
    data: D[];
    constructor(value: D, index: number | string, data: D[]);
}
