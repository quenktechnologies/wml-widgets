import { AppView } from "@quenk/wml-runtime";
export declare function thead<Z>(view: AppView<Z>, fields: any): Element | Node | HTMLElement;
export declare function tbody<Z>(view: AppView<Z>, data: any, fields: any): Element | Node | HTMLElement;
export declare class TableView<C> extends AppView<C> {
    constructor(context: C);
}
