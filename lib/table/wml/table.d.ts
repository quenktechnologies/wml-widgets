import * as ___wml from '@quenk/wml';
import { Column, Table as TableContext } from '..';
export declare const allSelectedCheckbox: <D>() => (___context: TableContext<D>) => (___view: ___wml.View) => Node;
export declare const headings: <D>(columns: Column<D>[]) => (___context: TableContext<D>) => (___view: ___wml.View) => ___wml.Content;
export declare const thead: <D>(columns: Column<D>[]) => (___context: TableContext<D>) => (___view: ___wml.View) => Node;
export declare const rowSelectCheckbox: <D>(row: D, index: number) => (___context: TableContext<D>) => (___view: ___wml.View) => Node;
export declare const rows: <D>(rowData: D, rowNumber: number, columns: Column<D>[]) => (___context: TableContext<D>) => (___view: ___wml.View) => ___wml.Content;
export declare const tbody: <D>(data: D[], columns: Column<D>[]) => (___context: TableContext<D>) => (___view: ___wml.View) => ___wml.Content;
export declare const table: <D>() => (___context: TableContext<D>) => (___view: ___wml.View) => Node;
export declare class Table<D> extends ___wml.AppView<TableContext<D>> {
    constructor(context: TableContext<D>);
}
