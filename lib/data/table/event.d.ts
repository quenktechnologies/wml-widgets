import { SortKey } from "./column/sort";
import { TableName } from ".";
/**
 * ColumnId type
 */
export declare type ColumnId = number;
/**
 * RowId type.
 */
export declare type RowId = number;
/**
 * HeadingClickedEvent is triggered when the user clicks on
 * one of the column headings.
 */
export declare class HeadingClickedEvent {
    column: ColumnId;
    constructor(column: ColumnId);
}
/**
 * CellClickedEvent triggered when a cell is clicked on.
 */
export declare class CellClickedEvent {
    column: ColumnId;
    row: RowId;
    constructor(column: ColumnId, row: RowId);
}
/**
 * DataChangedEvent generated when the internal representation of the data
 * changes.
 */
export declare class DataChangedEvent<R> {
    name: TableName;
    data: R[];
    key: SortKey;
    constructor(name: TableName, data: R[], key: SortKey);
}
