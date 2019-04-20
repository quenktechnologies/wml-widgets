import { View } from '@quenk/wml';
import { ControlAttrs, Event, AbstractControl } from '../';
/**
 * ESCAPE key code.
 */
export declare const ESCAPE = 27;
export declare const SEARCH = "ww-search";
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
     * block flag
     */
    block?: boolean;
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
export declare class Search extends AbstractControl<string, SearchAttrs> {
    view: View;
    values: {
        root: {
            wml: {
                id: string;
            };
            id: string;
            className: string;
            placeholder: string;
            readOnly: boolean | null;
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
