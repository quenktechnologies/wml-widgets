import * as wml from '@quenk/wml';
import { SearchControl } from './SearchControl';
import { SearchAttrs } from './SearchAttrs';

/**
 * PopulatedFun for rending a single search result.
 */
export type PopulatedFun =
    <V>(option: V, index: number, options: V[]) =>
        (s: SearchControl<V, SearchAttrs<V>>) =>
            (view: wml.View) =>
                wml.Content;
