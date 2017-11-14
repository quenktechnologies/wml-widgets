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
export class DefaultDelegate<D> implements Delegate<D> {

    constructor(public table: Table<D>) { }

    onAllSelected(e: AllSelectedEvent<D>): void {

        if (this.table.attrs.ww.onAllSelected)
            this.table.attrs.ww.onAllSelected(e);

    }

    onCellClicked<A>(e: CellClickedEvent<A,D>): void {

        if (this.table.attrs.ww.onCellClicked)
            this.table.attrs.ww.onCellClicked(e);

    }

    onHeadingClicked(e: HeadingClickedEvent): void {

        if (this.table.attrs.ww.onHeadingClicked)
            this.table.attrs.ww.onHeadingClicked(e);

    }

    onRowClicked(e: RowClickedEvent<D>): void {

        if (this.table.attrs.ww.onRowClicked)
            this.table.attrs.ww.onRowClicked(e);

    }

    onRowSelected(e: RowSelectedEvent<D>): void {

        if (this.table.attrs.ww.onRowSelected)
            this.table.attrs.ww.onRowSelected(e);

    }

}
