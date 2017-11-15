import * as ___wml from '@quenk/wml';
import { Search } from '../Search';
import { Result } from '../Result';
export declare const populated: <A extends Result>(___context: Search<A>) => (option: A) => (_index: number) => (_options: A[]) => (___view: ___wml.View) => ___wml.Content;
export declare const empty: <A extends Result>(___context: Search<A>) => (___view: ___wml.View) => ___wml.Content;
export declare class Results<A extends Result> extends ___wml.AppView<Search<A>> {
    constructor(context: Search<A>);
}
export declare class Main<A extends Result> extends ___wml.AppView<Search<A>> {
    constructor(context: Search<A>);
}
