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
export declare class RangeInstance implements Range {
    cells: HTMLTableDataCellElement[];
    constructor(cells: HTMLTableDataCellElement[]);
}
