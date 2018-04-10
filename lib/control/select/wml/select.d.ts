import * as ___wml from '@quenk/wml';
import { Select } from '../';
export declare const itemContentTemplate: <V>(___context: Select<V>) => (option: V) => (_index: number) => (___view: ___wml.View) => ___wml.Content;
export declare const noItemsTemplate: <V>(___context: Select<V>) => (___view: ___wml.View) => ___wml.Content;
export declare class Results<V> extends ___wml.AppView<Select<V>> {
    constructor(___context: Select<V>);
}
export declare class Main<V> extends ___wml.AppView<Select<V>> {
    constructor(___context: Select<V>);
}
