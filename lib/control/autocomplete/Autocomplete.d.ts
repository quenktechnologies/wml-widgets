import * as wml from '@quenk/wml';
import { SearchControlWidget, PopulatedFun, EmptyFun } from '@package/wml-widgets/control/search-control';
import { AutocompleteAttrs } from '.';
export declare const ESCAPE = 27;
export declare const INPUT_ID = "input";
/**
 * Autocomplate provides an input with a dropdown menu that allows
 * the user to search and select form a list of options.
 */
export declare class Autocomplete<V> extends SearchControlWidget<V, AutocompleteAttrs<V>> {
    view: wml.View;
    template: {
        populated: PopulatedFun<V>;
        empty: EmptyFun<V>;
    };
    values: {
        id: {
            root: string;
            input: string;
            menu: string;
            message: string;
        };
        class: {
            root: string;
            input: string;
        };
        root: {
            id: string;
            class: string;
        };
        help: {
            id: string;
            success: string;
            error: string;
            warning: string;
        };
        menu: {
            id: string;
        };
        label: {
            id: string;
            text: string;
        };
        input: {
            id: string;
            class: string;
            placeholder: string;
            onKeyDown: (e: KeyboardEvent) => void;
            onKeyUp: (e: KeyboardEvent) => void;
            onInput: (e: KeyboardEvent) => void;
        };
        search: {
            delay: number;
            results: V[];
        };
        item: {
            template: {
                populated: PopulatedFun<V>;
                empty: EmptyFun<V>;
            };
            stringify: (r: V) => string;
            click: (index: string | number) => void;
        };
    };
    clear(): Autocomplete<V>;
    open(): Autocomplete<V>;
    close(): Autocomplete<V>;
    update(results: V[]): Autocomplete<V>;
    value(): V;
}
