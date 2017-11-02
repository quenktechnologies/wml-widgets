import * as wml from '@quenk/wml';
import { Search } from './Search';
import { Result } from './Result';

/**
 * Populated for rending a single search result.
 */
export type Populated =
    <A extends Result>(option: A, index: number, options: A[]) => (s: Search<A>) => (view: wml.View) => wml.Content;

/**
 * Empty for rendering when there are no results.
 */
export type Empty = <A extends Result>() => (s: Search<A>) => (view: wml.View) => wml.Content;
