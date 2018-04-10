import { View } from '@quenk/wml';
import { ControlAttrs, Event, GenericControl } from '../';
/**
 * ESCAPE key code.
 */
export declare const ESCAPE = 27;
export declare const SEARCH = "ww-search form-control";
/**
 * SearchAttrs
 */
export interface SearchAttrs extends ControlAttrs<string> {
    /**
     * onSearch handler.
     */
    onSearch?: (e: TermChangedEvent) => void;
    /**
     * onEscape handler.
     */
    onEscape?: () => void;
    /**
     * onFocus handler.
     */
    onFocus?: () => void;
    /**
     * placeholder
     */
    placeholder?: string;
    /**
     * readOnly
     */
    readOnly?: boolean;
    /**
     * value
     */
    value?: string;
}
/**
 * TermChangedEvent signals the search term has changed.
 */
export declare class TermChangedEvent extends Event<string> {
    constructor(name: string, value: string);
}
/**
 * Search provides an input that can be used in the ui for a search engine.
 */
export declare class Search extends GenericControl<string, SearchAttrs> {
    view: View;
    values: {
        root: {
            id: string;
            class: string;
            placeholder: string;
            readOnly: boolean;
            value: string;
            onfocus: (e: KeyboardEvent) => void;
            onkeydown: (e: KeyboardEvent) => void;
            onkeyup: (e: KeyboardEvent) => void;
            oninput: (e: KeyboardEvent) => void;
        };
    };
    set(value: string): Search;
    get(): string;
}
