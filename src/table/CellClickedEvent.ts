import { Cell } from './Cell';

/**
 * CellClickedEvent is triggered when the whitespace of a cell is clicked.
 */
export class CellClickedEvent<C,R>{

    constructor(
        public value: C,
        public column: string,
        public rowData: R,
        public rowNumber: number,
        public cell: Cell) { }

}
