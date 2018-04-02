/**
 * RowClickedEvent is triggered when the user clicks on whitespace in
 * the row of a table.
 */
export declare class RowClickedEvent<R> {
    value: R;
    row: number;
    data: R[];
    constructor(value: R, row: number, data: R[]);
}
