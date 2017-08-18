import { AppView } from "@quenk/wml-runtime";
export declare class CreateDialog<C> extends AppView<C> {
    constructor(context: C);
}
export declare function navigation<Z>(view: AppView<Z>): Node;
export declare function content<Z>(view: AppView<Z>): Element | Node | HTMLElement;
export declare class Main<C> extends AppView<C> {
    constructor(context: C);
}
