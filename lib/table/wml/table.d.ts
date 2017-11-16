import * as ___wml from '@quenk/wml';
import { Column, Table as TableContext } from '..';
export declare const allSelectedCheckbox: <C, R>(___context: TableContext<C, R>) => (___view: ___wml.View) => Node;
export declare const headings: <C, R>(___context: TableContext<C, R>) => (columns: Column<C, R>[]) => (___view: ___wml.View) => ___wml.Content;
export declare const thead: <C, R>(___context: TableContext<C, R>) => (columns: Column<C, R>[]) => (___view: ___wml.View) => Node;
export declare const rowSelectCheckbox: <C, R>(___context: TableContext<C, R>) => (row: R) => (index: number) => (___view: ___wml.View) => Node;
export declare const cells: <C, R>(___context: TableContext<C, R>) => (rowData: R) => (rowNumber: number) => (columns: Column<C, R>[]) => (___view: ___wml.View) => ___wml.Content;
export declare const rows: <C, R>(___context: TableContext<C, R>) => (data: R[]) => (columns: Column<C, R>[]) => (___view: ___wml.View) => ___wml.Content;
export declare const table: <C, R>(___context: TableContext<C, R>) => (___view: ___wml.View) => Node;
export declare class Table<C, R> extends ___wml.AppView<TableContext<C, R>> {
    constructor(context: TableContext<C, R>);
}
