import * as wml from '@quenk/wml';
import { Search } from './Search';
import { Result } from './Result';
/**
 * Populated for rending a single search result.
 */
export declare type Populated = <A extends Result>(s: Search<A>) => (option: A) => (index: number) => (options: A[]) => (view: wml.View) => wml.Content;
/**
 * Empty for rendering when there are no results.
 */
export declare type Empty = <A extends Result>(s: Search<A>) => (view: wml.View) => wml.Content;
