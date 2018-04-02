import * as ___wml from '@quenk/wml';
import { Column, Table as Table } from '..';
export declare const thead: <C, R>(___context: Table<C, R>) => (columns: Column<C, R>[]) => (___view: ___wml.View) => Node;
export declare const heads: <C, R>(___context: Table<C, R>) => (columns: Column<C, R>[]) => (___view: ___wml.View) => Node;
export declare const allSelectedCheckbox: <C, R>(___context: Table<C, R>) => (___view: ___wml.View) => Node;
export declare const headings: <C, R>(___context: Table<C, R>) => (columns: Column<C, R>[]) => (___view: ___wml.View) => ___wml.Content;
export declare const tbody: <C, R>(___context: Table<C, R>) => (data: R[]) => (columns: Column<C, R>[]) => (___view: ___wml.View) => Node;
export declare const rows: <C, R>(___context: Table<C, R>) => (data: R[]) => (columns: Column<C, R>[]) => (___view: ___wml.View) => ___wml.Content;
export declare const cells: <C, R>(___context: Table<C, R>) => (rowData: R) => (rowNumber: number) => (columns: Column<C, R>[]) => (___view: ___wml.View) => ___wml.Content;
export declare const rowSelectCheckbox: <C, R>(___context: Table<C, R>) => (row: R) => (index: number) => (___view: ___wml.View) => Node;
export declare const table: <C, R>(___context: Table<C, R>) => (___view: ___wml.View) => Node;
export declare class Main<C, R> extends ___wml.AppView<Table<C, R>> {
    constructor(___context: Table<C, R>);
}
