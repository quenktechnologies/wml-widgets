import { SortKey } from './column/sort';
import { TableName } from '.';

/**
 * ColumnId type
 */
export type ColumnId = number;

/**
 * RowId type.
 */
export type RowId = number;

/**
 * HeadingClickedEvent is triggered when the user clicks on
 * one of the column headings.
 */
export class HeadingClickedEvent {
    constructor(public column: ColumnId) {}
}

/**
 * CellClickedEvent triggered when a cell is clicked on.
 */
export class CellClickedEvent {
    constructor(
        public column: ColumnId,
        public row: RowId
    ) {}
}

/**
 * DataChangedEvent generated when the internal representation of the data
 * changes.
 */
export class DataChangedEvent<R> {
    constructor(
        public name: TableName,
        public data: R[],
        public key: SortKey
    ) {}
}
