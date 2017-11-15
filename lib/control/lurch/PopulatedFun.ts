import * as wml from '@quenk/wml';
import { SearchControl } from './SearchControl';
import { SearchAttrs } from './SearchAttrs';

/**
 * PopulatedFun for rending a single search result.
 */
export type PopulatedFun =
    <V>(s: SearchControl<V, SearchAttrs<V>>) =>
  (option: V) => (index: number) => (options: V[]) =>
            (view: wml.View) => wml.Content;
