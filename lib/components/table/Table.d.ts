import { Component, Attrs, Content, View } from '@quenk/wml-runtime';
import { TableView } from './wml/table';
export declare const dateSort: (a: string, b: string) => 0 | 1 | -1;
export declare const stringSort: (a: string, b: string) => 0 | 1 | -1;
export declare const naturalSort: (a: any, b: any) => 0 | 1 | -1;
export declare const numberSort: (a: any, b: any) => 0 | 1 | -1;
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
export declare class CellClickedEvent<D> {
    value: CellContent;
    name: string;
    index: number | string;
    row: D;
    table: Table<D>;
    constructor(value: CellContent, name: string, index: number | string, row: D, table: Table<D>);
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
    (view: View, datum: CellContent, name: string, row: D, field: Field<D>): Content;
}
export declare type CellContent = boolean | number | string;
export interface TableModel {
    allSelected(): void;
    cellClickedEvent<D>(e: CellClickedEvent<D>): void;
    headingClicked<D>(e: HeadingClickedEvent<D>): void;
    rowClicked<D>(e: RowClickedEvent<D>): void;
    rowSelected<D>(e: RowSelectedEvent<D>): void;
}
export declare class DefaultTableModel implements TableModel {
    allSelected(): void;
    cellClickedEvent<D>(_e: CellClickedEvent<D>): void;
    headingClicked<D>(_e: HeadingClickedEvent<D>): void;
    rowClicked<D>(_e: RowClickedEvent<D>): void;
    rowSelected<D>(_e: RowSelectedEvent<D>): void;
}
export declare class SortTableModel extends DefaultTableModel {
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
        model?: TableModel;
    };
}
export declare class Table<D> extends Component<TableAttrs<D>> {
    originalData: D[];
    data: D[];
    sortedOn: string;
    arrow: string;
    view: TableView<this>;
    model: TableModel;
    sort(name: string): void;
    /**
     * update the data the table displays
     */
    update(data: D[]): void;
}
