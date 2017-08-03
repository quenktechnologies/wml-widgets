import { Component, Attrs } from '@quenk/wml-runtime';
import { TableView } from './wml/table';
export declare const dateSort: (a: any, b: any) => 0 | 1 | -1;
export declare const stringSort: (a: any, b: any) => 0 | 1 | -1;
export declare const naturalSort: (a: any, b: any) => 0 | 1 | -1;
export declare const numberSort: (a: any, b: any) => 0 | 1 | -1;
export declare class HeadingClickedEvent<A> {
    name: string;
    field: Field;
    table: Table<A>;
    constructor(name: string, field: Field, table: Table<A>);
}
export declare class RowClickedEvent<A> {
    value: A;
    index: number;
    data: A[];
    table: Table<A>;
    constructor(value: A, index: number, data: A[], table: Table<A>);
}
export declare class RowSelectedEvent<A> extends RowClickedEvent<A> {
}
export declare class CellClickedEvent<V, A> {
    value: V;
    name: string;
    index: number;
    object: A;
    table: Table<A>;
    constructor(value: V, name: string, index: number, object: A, table: Table<A>);
}
export declare type Comparable = string | number | boolean;
export interface Field {
    name: string;
    heading: string;
    hidden?: boolean;
    sortAs?: string;
    strategy?: (a: Comparable, b: Comparable) => number;
}
export interface TableModel {
    allSelected(): void;
    headingClicked<A>(e: HeadingClickedEvent<A>): void;
    rowClicked<A>(e: RowClickedEvent<A>): void;
    rowSelected<A>(e: RowSelectedEvent<A>): void;
}
export declare class DefaultTableModel implements TableModel {
    allSelected(): void;
    headingClicked<A>(_e: HeadingClickedEvent<A>): void;
    rowClicked<A>(_e: RowClickedEvent<A>): void;
    rowSelected<A>(_e: RowSelectedEvent<A>): void;
}
export declare class SortTableModel extends DefaultTableModel {
    headingClicked<A>(e: HeadingClickedEvent<A>): void;
}
export interface TableAttrs<D> extends Attrs {
    ww?: {
        selectable?: boolean;
        headingClass?: string;
        rowClass?: string;
        cellClass?: string;
        fields: Field[];
        data: D[];
    };
}
export declare class Table<D> extends Component<TableAttrs<D>> {
    originalData: D[];
    data: D[];
    sortedOn: string;
    arrow: string;
    view: TableView<this>;
    model: TableModel;
    constructor(a: any, c: any);
    sort(name: any): void;
}
