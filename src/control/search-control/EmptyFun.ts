import * as wml from '@quenk/wml';
import { SearchControl } from './SearchControl';

/**
 * EmpFun for rendering when there are no results.
 */
export type EmptyFun<V> = (s: SearchControl<V>) => (view: wml.View) => wml.Content;
