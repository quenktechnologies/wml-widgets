import { AppView } from "@quenk/wml-runtime";
import { Field } from '../Table';
export declare function thead<D, Z>(view: AppView<Z>, fields: Field<D>[]): Node;
export declare function tbody<D, Z>(view: AppView<Z>, data: D[], fields: Field<D>[]): Element | Node | HTMLElement;
export declare function table<Z>(view: AppView<Z>): Node;
export declare class TableView<C> extends AppView<C> {
    constructor(context: C);
}
