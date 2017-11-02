import * as wml from '@quenk/wml';
import { SearchControl } from './SearchControl';
import { SearchAttrs } from './SearchAttrs';

/**
 * EmpFun for rendering when there are no results.
 */
export type EmptyFun = <V>() => (s: SearchControl<V, SearchAttrs<V>>) => (view: wml.View) => wml.Content;
