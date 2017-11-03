import * as ___wml from '@quenk/wml';
import * as T from '../Table';
export declare const allSelectedCheckbox: <D>() => (___context: T.Table<D>) => (___view: ___wml.View) => Node;
export declare const headings: <D>(fields: T.Field<D>[]) => (___context: T.Table<D>) => (___view: ___wml.View) => ___wml.Content;
export declare const thead: <D>(fields: T.Field<D>[]) => (___context: T.Table<D>) => (___view: ___wml.View) => Node;
export declare const rowSelectCheckbox: <D>(row: D, index: string, data: D[]) => (___context: T.Table<D>) => (___view: ___wml.View) => Node;
export declare const rows: <D>(row: D, index: string, fields: T.Field<D>[]) => (___context: T.Table<D>) => (___view: ___wml.View) => ___wml.Content;
export declare const tbody: <D>(data: D[], fields: T.Field<D>[]) => (___context: T.Table<D>) => (___view: ___wml.View) => ___wml.Content;
export declare const table: <D>() => (___context: T.Table<D>) => (___view: ___wml.View) => Node;
export declare class Table<D> extends ___wml.AppView<T.Table<D>> {
    constructor(context: T.Table<D>);
}
