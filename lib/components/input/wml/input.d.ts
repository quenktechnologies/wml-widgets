import { AppView } from "@quenk/wml-runtime";
export declare function label<Z>(view: AppView<Z>): Node;
export declare function message<Z>(view: AppView<Z>): Node;
export declare class SelectView<C> extends AppView<C> {
    constructor(context: C);
}
export declare class InputView<C> extends AppView<C> {
    constructor(context: C);
}
