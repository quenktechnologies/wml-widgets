import * as wml from '@quenk/wml';
import { SearchControl } from './SearchControl';
/**
 * PopulatedFun for rending a single search result.
 */
export declare type PopulatedFun<V> = (s: SearchControl<V>) => (option: V) => (index: number) => (options: V[]) => (view: wml.View) => wml.Content;
