import { Cell } from './Cell';
/**
 * CellClickedEvent is triggered when the whitespace of a cell is clicked.
 */
export declare class CellClickedEvent<C, R> {
    value: C;
    column: string;
    rowData: R;
    rowNumber: number;
    cell: Cell;
    constructor(value: C, column: string, rowData: R, rowNumber: number, cell: Cell);
}
