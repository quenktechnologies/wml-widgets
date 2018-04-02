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
export class DefaultDelegate<C, R> implements Delegate<C, R> {

    constructor(public table: Table<C, R>) { }

    onAllSelected(e: AllSelectedEvent<R>): void {

        if (this.table.attrs.ww.onAllSelected)
            this.table.attrs.ww.onAllSelected(e);

    }

    onCellClicked(e: CellClickedEvent<C, R>): void {

        if (this.table.attrs.ww.onCellClicked)
            this.table.attrs.ww.onCellClicked(e);

    }

    onHeadingClicked(e: HeadingClickedEvent): void {

        if (this.table.attrs.ww.onHeadingClicked)
            this.table.attrs.ww.onHeadingClicked(e);

    }

    onRowClicked(e: RowClickedEvent<R>): void {

        if (this.table.attrs.ww.onRowClicked)
            this.table.attrs.ww.onRowClicked(e);

    }

    onRowSelected(e: RowSelectedEvent<R>): void {

        if (this.table.attrs.ww.onRowSelected)
            this.table.attrs.ww.onRowSelected(e);

    }

}
