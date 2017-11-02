/**
 * CellClickedEvent is triggered when the whitespace of a cell is clicked.
 */
export class CellClickedEvent<D, A>{

    constructor(
        public value: A,
        public name: string,
        public index: number | string,
        public row: D) { }

}
