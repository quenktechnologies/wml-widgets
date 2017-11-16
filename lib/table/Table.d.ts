import { Component, View, Renderable, Maybe } from '@quenk/wml';
import { Cell } from './Cell';
import { TableAttrs, Delegate, Column } from '.';
/**
 * Table provides a smarter html table.
 *
 * @todo split sort and select api into own table widgets.
 */
export declare class Table<D> extends Component<TableAttrs<D>> {
    originalData: D[];
    view: View;
    delegate: Delegate<D>;
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
                    onclick: (row: D, index: number, data: D[]) => () => void;
                    onSelect: (row: D, index: number, data: D[]) => () => void;
                };
                td: {
                    id: (column: string, colNumber: number, rowNumber: number) => string;
                    class: string;
                    onclick: <V>(value: V, column: string, rowData: D, rowNumber: number) => (e: Event) => void;
                };
            };
        };
        sortedOn: string;
        data: D[];
        columns: Column<D>[];
        arrow: string;
    };
    /**
     * modifyBody allows a function to modify the contents
     * of the <tbody>
     */
    modifyBody(f: (e: HTMLElement) => void): Table<D>;
    sort(name: string): Table<D>;
    /**
     * update the data the table displays
     */
    update(data: D[]): Table<D>;
    /**
     * cellAt produces a Cell instance for the coordinates passed (if found).
     */
    cellAt(column: string, row: number): Maybe<Cell>;
    /**
     * prepend adds one or more new data rows to the begining of the table.
     */
    prepend(data: D | D[]): Table<D>;
    /**
     * append adds one or more new data rows to the end of the table.
     */
    append(data: D | D[]): Table<D>;
    /**
     * prependRow prepends customisable DOM content to the
     * begining of the table body.
     *
     * NOTE: This DOM content of must be between <tr> elements.
     */
    prependRow(renderer: Renderable): Table<D>;
    /**
     * appendRow appends customisable DOM content to the
     * begining of the table body.
     *
     * NOTE: This DOM content of must be between <tr> elements.
     */
    appendRow(renderer: Renderable): Table<D>;
    /**
     * removeRow will remove an entire row from the table given its index.
     */
    removeRow(index: number): Table<D>;
}
