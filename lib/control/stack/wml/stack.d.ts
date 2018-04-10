import * as ___wml from '@quenk/wml';
import { Stack } from '../';
export declare const content: <V>(___context: Stack<V>) => (v: V) => (_: number) => (___view: ___wml.View) => Node;
export declare class Main<V> extends ___wml.AppView<Stack<V>> {
    constructor(___context: Stack<V>);
}
