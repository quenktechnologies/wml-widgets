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
                    id: (column: string, rowNumber: number) => string;
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
    sort(name: string): void;
    /**
     * update the data the table displays
     */
    update(data: D[]): void;
    /**
     * cellAt produces a Cell instance for the coordinates passed (if found).
     */
    cellAt(column: string, row: number): Maybe<Cell>;
}
