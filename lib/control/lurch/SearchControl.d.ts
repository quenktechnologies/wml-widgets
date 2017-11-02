import { SearchAttrs } from './SearchAttrs';
import { SearchDelegate } from './SearchDelegate';
import { FormControl } from '@package/self/control';
import { SearchValues } from './SearchValues';
export declare const ESCAPE = 27;
export declare const DEFAULT_DEBOUNCE_TIME = 500;
export declare const INPUT_ID = "input";
/**
 * SearchControl
 */
export declare abstract class SearchControl<V, A extends SearchAttrs<V>> extends FormControl<V, A> {
    abstract values: SearchValues<V>;
    DEFAULT_DEBOUNCE_TIME: number;
    delegate: SearchDelegate<V>;
    results: V[];
    onKeyDown: (e: KeyboardEvent) => void;
    onKeyUp: (e: KeyboardEvent) => void;
    onInput: (e: KeyboardEvent) => void;
    execute: (a: {}) => void;
    stringify: (v: V) => string;
    /**
     * update the Search with new results.
     */
    abstract update(results: V[]): SearchControl<V, A>;
    /**
     * open the search result dialog.
     */
    abstract open(): SearchControl<V, A>;
    /**
     * close the search result dialog.
     */
    abstract close(): SearchControl<V, A>;
    rendered(): void;
    handleEvent(e: Event): void;
}
