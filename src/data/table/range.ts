/**
 * Range provides a list of table cells that have been retrieved from the
 * table's DOM.
 */
export interface Range {
    /**
     * cells in the range.
     */
    cells: HTMLTableDataCellElement[];
}

/**
 * RangeInstance
 */
export class RangeInstance implements Range {
    constructor(public cells: HTMLTableDataCellElement[]) {}
}
