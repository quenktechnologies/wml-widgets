import { Component, View, Renderable, Maybe } from '@quenk/wml';
import { Cell } from './Cell';
import { TableAttrs, Delegate, Column } from '.';
/**
 * Table provides a smarter html table.
 *
 * @todo split sort and select api into own table widgets.
 */
export declare class Table<C, R> extends Component<TableAttrs<C, R>> {
    originalData: R[];
    view: View;
    delegate: Delegate<C, R>;
    values: {
        id: {
            root: string;
        };
        class: {
            root: string;
            row: string;
            cell: string;
            heading: string;
        };
        fragment: {
            empty: Renderable;
        };
        options: {
            selectable: boolean;
        };
        table: {
            thead: {
                th: {
                    onclick: (field: string) => () => void;
                    onSelect: () => void;
                };
            };
            tbody: {
                tr: {
                    class: string;
                    onclick: (row: R, index: number, data: R[]) => () => void;
                    onSelect: (row: R, index: number, data: R[]) => () => void;
                };
                td: {
                    id: (column: string, colNumber: number, rowNumber: number) => string;
                    class: string;
                    onclick: (value: C, column: string, rowData: R, rowNumber: number) => (e: Event) => void;
                };
            };
        };
        sortedOn: string;
        data: R[];
        columns: Column<C, R>[];
        arrow: string;
    };
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
