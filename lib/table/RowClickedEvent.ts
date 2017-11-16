/**
 * RowClickedEvent is triggered when the user clicks on whitespace in 
 * the row of a table.
 */
export class RowClickedEvent<R> {

    constructor(public value: R, public row: number, public data: R[]) { }

}


