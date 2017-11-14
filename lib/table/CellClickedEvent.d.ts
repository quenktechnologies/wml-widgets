import { Cell } from './Cell';
/**
 * CellClickedEvent is triggered when the whitespace of a cell is clicked.
 */
export declare class CellClickedEvent<A, D> {
    value: A;
    column: string;
    rowData: D;
    rowNumber: number;
    cell: Cell;
    constructor(value: A, column: string, rowData: D, rowNumber: number, cell: Cell);
}
