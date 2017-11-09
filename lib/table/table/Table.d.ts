import { Component, Attrs, View, ContentProvider, Renderable } from '@quenk/wml';
import { CellClickedEvent } from './CellClickedEvent';
import { RowClickedEvent } from './RowClickedEvent';
import { RowSelectedEvent } from './RowSelectedEvent';
import { HeadingClickedEvent } from './HeadingClickedEvent';
export declare const dateSort: (a: string, b: string) => 0 | 1 | -1;
export declare const stringSort: (a: string, b: string) => 0 | 1 | -1;
export declare const naturalSort: (a?: any, b?: any) => 0 | 1 | -1;
export declare const numberSort: (a: any, b: any) => 0 | 1 | -1;
export declare type Comparable = string | number | boolean;
export interface SortingStrategy {
    (a: Comparable, b: Comparable): number;
}
export interface Field<D> {
    name: string;
    heading: string;
    hidden?: boolean;
    sortAs?: string;
    fragment?: CellFragment<D>;
    strategy?: SortingStrategy;
}
export interface CellFragment<D> {
    (datum: any, name: string, row: D): ContentProvider;
}
export interface TableModel<D> {
    allSelected(): void;
    cellClicked<A>(e: CellClickedEvent<D, A>): void;
    headingClicked(e: HeadingClickedEvent<D>): void;
    rowClicked(e: RowClickedEvent<D>): void;
    rowSelected(e: RowSelectedEvent<D>): void;
}
export declare class DefaultTableModel<D> implements TableModel<D> {
    table: Table<D>;
    constructor(table: Table<D>);
    allSelected(): void;
    cellClicked<A>(_e: CellClickedEvent<D, A>): void;
    headingClicked(_e: HeadingClickedEvent<D>): void;
    rowClicked(_e: RowClickedEvent<D>): void;
    rowSelected(_e: RowSelectedEvent<D>): void;
}
export declare class SortTableModel<D> extends DefaultTableModel<D> {
    headingClicked<D>(e: HeadingClickedEvent<D>): void;
}
export interface TableAttrs<D> extends Attrs {
    ww: {
        class?: string;
        selectable?: boolean;
        headingClass?: string;
        rowClass?: string;
        cellClass?: string;
        fields: Field<D>[];
        data: D[];
        model?: TableModel<D>;
        empty?: Renderable;
    };
}
/**
 * Table provides a smarter html table.
 */
export declare class Table<D> extends Component<TableAttrs<D>> {
    originalData: D[];
    view: View;
    model: TableModel<D>;
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
        sortedOn: string;
        data: D[];
        fields: Field<D>[];
        arrow: string;
    };
    sort(name: string): void;
    /**
     * update the data the table displays
     */
    update(data: D[]): void;
}
