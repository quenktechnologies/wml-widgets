import { FormControlValues } from '@package/self/control';
/**
 * SearchValues describes the values available to all Search
 * templates.
 */
export interface SearchValues<V> extends FormControlValues {
    id: {
        root: string;
        input: string;
        menu: string;
        message: string;
    };
    class: {
        input: string;
        root: string;
    };
    /**
     * root element values
     */
    root: {
        id: string;
        class: string;
    };
    /**
     * input values for the input element used to receive search terms.
     */
    input: {
        id: string;
        placeholder: string;
        onKeyDown: (e: KeyboardEvent) => void;
        onKeyUp: (e: KeyboardEvent) => void;
        onInput: (e: KeyboardEvent) => void;
    };
    /**
     * search is values for search related functionality.
     */
    search: {
        delay: number;
        results: V[];
    };
    /**
     * item is values used in rendering each result
     */
    item: {
        stringify: (v: V) => string;
        click: (index: number | string) => void;
    };
}
