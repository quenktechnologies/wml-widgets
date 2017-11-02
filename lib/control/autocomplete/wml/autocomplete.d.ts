import * as $wml from '@quenk/wml';
import { Autocomplete } from '../Autocomplete';
export declare const populated: <V>(option: V, _index: number, _options: V[]) => (___context: Autocomplete<V>) => (___view: $wml.View) => Element | Node | HTMLElement;
export declare const empty: <V>() => (___context: Autocomplete<V>) => (___view: $wml.View) => Element | Node | HTMLElement;
export declare class Results<V> extends $wml.AppView<Autocomplete<V>> {
    constructor(context: Autocomplete<V>);
}
export declare class Main<V> extends $wml.AppView<Autocomplete<V>> {
    constructor(context: Autocomplete<V>);
}
