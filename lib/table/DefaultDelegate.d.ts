import { Delegate } from '.';
import { AllSelectedEvent } from './AllSelectedEvent';
import { CellClickedEvent } from './CellClickedEvent';
import { HeadingClickedEvent } from './HeadingClickedEvent';
import { RowClickedEvent } from './RowClickedEvent';
import { RowSelectedEvent } from './RowSelectedEvent';
import { Table } from './Table';
/**
 * DefaultDelegate will handle table events if no Delegate is
 * specified.
 *
 * It passes it's events onto registered callbacks.
 */
export declare class DefaultDelegate<C, R> implements Delegate<C, R> {
    table: Table<C, R>;
    constructor(table: Table<C, R>);
    onAllSelected(e: AllSelectedEvent<R>): void;
    onCellClicked(e: CellClickedEvent<C, R>): void;
    onHeadingClicked(e: HeadingClickedEvent): void;
    onRowClicked(e: RowClickedEvent<R>): void;
    onRowSelected(e: RowSelectedEvent<R>): void;
}
