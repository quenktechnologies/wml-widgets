import { Cell } from './Cell';

/**
 * CellClickedEvent is triggered when the whitespace of a cell is clicked.
 */
export class CellClickedEvent<A,D>{

    constructor(
        public value: A,
        public column: string,
        public rowData: D,
        public rowNumber: number,
        public cell: Cell) { }

}
