import { Component, Attrs, Content, View } from '@quenk/wml-runtime';
import { TableView } from './wml/table';
export declare const dateSort: (a: string, b: string) => 1 | -1 | 0;
export declare const stringSort: (a: string, b: string) => 1 | -1 | 0;
export declare const naturalSort: (a: any, b: any) => 1 | -1 | 0;
export declare const numberSort: (a: any, b: any) => 1 | -1 | 0;
export declare class HeadingClickedEvent<D> {
    name: string;
    field: Field<D>;
    table: Table<D>;
    constructor(name: string, field: Field<D>, table: Table<D>);
}
export declare class RowClickedEvent<D> {
    value: D;
    index: number | string;
    data: D[];
    table: Table<D>;
    constructor(value: D, index: number | string, data: D[], table: Table<D>);
}
export declare class RowSelectedEvent<D> extends RowClickedEvent<D> {
}
export declare class CellClickedEvent<D, A> {
    value: A;
    name: string;
    index: number | string;
    row: D;
    table: Table<D>;
    constructor(value: A, name: string, index: number | string, row: D, table: Table<D>);
}
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
    (view: View, datum?: any, name?: string, row?: D, field?: Field<D>): Content;
}
export interface TableModel<D> {
    allSelected(): void;
    cellClickedEvent<A>(e: CellClickedEvent<D, A>): void;
    headingClicked(e: HeadingClickedEvent<D>): void;
    rowClicked(e: RowClickedEvent<D>): void;
    rowSelected(e: RowSelectedEvent<D>): void;
}
export declare class DefaultTableModel implements TableModel<any> {
    allSelected(): void;
    cellClickedEvent(_e: CellClickedEvent<any, any>): void;
    headingClicked(_e: HeadingClickedEvent<any>): void;
    rowClicked(_e: RowClickedEvent<any>): void;
    rowSelected(_e: RowSelectedEvent<any>): void;
}
export declare class SortTableModel<D> extends DefaultTableModel {
    headingClicked<D>(e: HeadingClickedEvent<D>): void;
}
export interface TableAttrs<D> extends Attrs {
    ww: {
        selectable?: boolean;
        headingClass?: string;
        rowClass?: string;
        cellClass?: string;
        fields: Field<D>[];
        data: D[];
        model?: TableModel<D>;
    };
}
export declare class Table<D> extends Component<TableAttrs<D>> {
    originalData: D[];
    data: D[];
    sortedOn: string;
    arrow: string;
    view: TableView<this>;
    model: TableModel<D>;
    sort(name: string): void;
    /**
     * update the data the table displays
     */
    update(data: D[]): void;
}
