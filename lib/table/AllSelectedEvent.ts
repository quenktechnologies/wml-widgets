/**
 * AllSelectedEvent is triggered when the user selects all the fields on the table.
 */
export class AllSelectedEvent<D>{

    constructor(public value: D[]) { }

}
