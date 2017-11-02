/**
 * RowClickedEvent is triggered when the user clicks on whitespace in 
 * the row of a table.
 */
export class RowClickedEvent <D> {

    constructor(
        public value: D,
        public index: number | string,
        public data: D[]) { }

}


