import { SearchControlAttrs } from './SearchControlAttrs';
import { SearchDelegate } from './SearchDelegate';
import { FormControlWidget } from '@package/self/control/form-control';
import { SearchControlWidgetValues } from './SearchControlWidgetValues';
export declare const ESCAPE = 27;
export declare const DEFAULT_DEBOUNCE_TIME = 500;
export declare const INPUT_ID = "input";
/**
 * SearchControlWidget
 */
export declare abstract class SearchControlWidget<V, A extends SearchControlAttrs<V>> extends FormControlWidget<V, A> {
    abstract values: SearchControlWidgetValues<V>;
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
    abstract update(results: V[]): SearchControlWidget<V, A>;
    /**
     * open the search result dialog.
     */
    abstract open(): SearchControlWidget<V, A>;
    /**
     * close the search result dialog.
     */
    abstract close(): SearchControlWidget<V, A>;
    rendered(): void;
    handleEvent(e: Event): void;
    abstract value(): V;
}
