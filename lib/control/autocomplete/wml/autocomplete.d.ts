import * as ___wml from '@quenk/wml';
import { Autocomplete } from '../Autocomplete';
export declare const populated: <V>(___context: Autocomplete<V>) => (option: V) => (_index: number) => (_options: V[]) => (___view: ___wml.View) => ___wml.Content;
export declare const empty: <V>(___context: Autocomplete<V>) => (___view: ___wml.View) => ___wml.Content;
export declare class Results<V> extends ___wml.AppView<Autocomplete<V>> {
    constructor(context: Autocomplete<V>);
}
export declare class Main<V> extends ___wml.AppView<Autocomplete<V>> {
    constructor(context: Autocomplete<V>);
}
