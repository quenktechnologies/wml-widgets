import { Component, View, Renderable, Maybe } from '@quenk/wml';
import { Cell } from './Cell';
import { TableAttrs, TableValues, Delegate } from '.';
/**
 * Table provides a smarter html table.
 *
 * @todo split sort and select api into own table widgets.
 */
export declare class Table<C, R> extends Component<TableAttrs<C, R>> {
    originalData: R[];
    view: View;
    delegate: Delegate<C, R>;
    values: TableValues<C, R>;
    /**
     * modifyBody allows a function to modify the contents
     * of the <tbody>
     */
    modifyBody(f: (e: HTMLElement) => void): Table<C, R>;
    sort(name: string): Table<C, R>;
    /**
     * update the data the table displays
     */
    update(data: R[]): Table<C, R>;
    /**
     * cellAt produces a Cell instance for the coordinates passed (if found).
     */
    cellAt(column: string, row: number): Maybe<Cell>;
    /**
     * prepend adds one or more new data rows to the begining of the table.
     */
    prepend(data: R | R[]): Table<C, R>;
    /**
     * append adds one or more new data rows to the end of the table.
     */
    append(data: R | R[]): Table<C, R>;
    /**
     * prependRow prepends customisable DOM content to the
     * begining of the table body.
     *
     * NOTE: This DOM content of must be between <tr> elements.
     */
    prependRow(renderer: Renderable): Table<C, R>;
    /**
     * appendRow appends customisable DOM content to the
     * begining of the table body.
     *
     * NOTE: This DOM content of must be between <tr> elements.
     */
    appendRow(renderer: Renderable): Table<C, R>;
    /**
     * removeRow will remove an entire row from the table given its index.
     */
    removeRow(index: number): Table<C, R>;
}
