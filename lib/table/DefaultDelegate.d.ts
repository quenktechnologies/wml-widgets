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
export declare class DefaultDelegate<D> implements Delegate<D> {
    table: Table<D>;
    constructor(table: Table<D>);
    onAllSelected(e: AllSelectedEvent<D>): void;
    onCellClicked<A>(e: CellClickedEvent<A, D>): void;
    onHeadingClicked(e: HeadingClickedEvent): void;
    onRowClicked(e: RowClickedEvent<D>): void;
    onRowSelected(e: RowSelectedEvent<D>): void;
}
