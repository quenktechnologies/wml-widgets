import * as $wml from '@quenk/wml';
import { Search } from '../Search';
import { Result } from '../Result';
export declare const populated: <A extends Result>(option: A, _index: number, _options: A[]) => (___context: Search<A>) => (___view: $wml.View) => Element | Node | HTMLElement;
export declare const empty: <A extends Result>() => (___context: Search<A>) => (___view: $wml.View) => Element | Node | HTMLElement;
export declare class Results<A extends Result> extends $wml.AppView<Search<A>> {
    constructor(context: Search<A>);
}
export declare class Main<A extends Result> extends $wml.AppView<Search<A>> {
    constructor(context: Search<A>);
}
