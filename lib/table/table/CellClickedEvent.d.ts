/**
 * CellClickedEvent is triggered when the whitespace of a cell is clicked.
 */
export declare class CellClickedEvent<D, A> {
    value: A;
    name: string;
    index: number | string;
    row: D;
    constructor(value: A, name: string, index: number | string, row: D);
}
