import { View } from '@quenk/wml';
import { Stringifier, ItemTemplate, NoItemsTemplate, ItemSelectedEvent } from '../results-menu';
import { ControlAttrs, Event, AbstractControl } from '../';
export { Stringifier, ItemTemplate, NoItemsTemplate, ItemSelectedEvent };
/**
 * ESCAPE key code.
 */
export declare const ESCAPE = 27;
export declare const SEARCH = "ww-search";
export declare const SEARCH_INPUT = "ww-search__input";
/**
 * CommonAttrs
 */
export interface CommonAttrs<V> extends ControlAttrs<V> {
    /**
     * onSearch handler.
     */
    onSearch?: (e: TermChangedEvent) => void;
    /**
     * onFocus handler.
     */
    onFocus?: (e: FocusGainedEvent) => void;
    /**
     * onBlur handler
     */
    onBlur?: (e: FocusLostEvent) => void;
    /**
     * stringifier turns item values into a string so that
     * they can be used used as labels.
     */
    stringifier?: Stringifier<V>;
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
}
/**
 * InputAttrs
 */
export interface InputAttrs<V> extends CommonAttrs<V> {
    /**
     * size of the input.
     */
    size?: number;
    /**
     * onEscape handler.
     */
    onEscape?: (e: EscapeEvent) => void;
}
/**
 * SearchAttrs
 */
export interface SearchAttrs<V> extends CommonAttrs<V> {
    /**
     * onSelect is applied when the user selects an item.
     */
    onSelect?: (e: ItemSelectedEvent<V>) => void;
    /**
     * itemTemplate if specified will be used to render each
     * result item.
     */
    itemTemplate?: ItemTemplate<V>;
    /**
     * noItemsTemplate for rendering the lack of search results.
     */
    noItemsTemplate?: NoItemsTemplate;
    /**
     * term value to display
     */
    term?: string;
}
/**
 * TermChangedEvent signals the search term has changed.
 */
export declare class TermChangedEvent extends Event<string> {
}
/**
 * FocusGainedEvent signals the user as given focus to the control.
 */
export declare class FocusGainedEvent {
    name: string;
    constructor(name: string);
}
/**
 * FocusLostEvent signals the user has removed focus from the control.
 */
export declare class FocusLostEvent {
    name: string;
    constructor(name: string);
}
/**
 * EscapeEvent signals the user has pressed the escape key while typing.
 */
export declare class EscapeEvent {
    name: string;
    constructor(name: string);
}
/**
 * Input provides the input part of a Search control.
 *
 * This is here mostly for code re-use.
 */
export declare class Input extends AbstractControl<string, InputAttrs<string>> {
    view: View;
    values: {
        wml: {
            id: string;
        };
        className: string;
        placeholder: string;
        readOnly: true | undefined;
        autocomplete: string;
        size: string;
        value: string;
        onfocus: (e: KeyboardEvent) => void;
        onkeydown: (e: KeyboardEvent) => void;
        onkeyup: (e: KeyboardEvent) => void;
        oninput: (e: KeyboardEvent) => void;
        onblur: () => void;
    };
    /**
     * focus steals user focus to the Input.
     */
    focus(): Input;
    /**
     * setSize sets the size of the input.
     */
    setSize(n: number): Input;
    /**
     * getSize returns the size of the (internally tracked) size
     * of the Input.
     */
    getSize(): number;
}
/**
 * Search provides an input that can be used in the ui for a search engine.
 */
export declare class Search<V> extends AbstractControl<V, SearchAttrs<V>> {
    view: View;
    values: {
        root: {
            wml: {
                id: string;
            };
            id: string;
            className: string;
        };
        input: {
            wml: {
                id: string;
            };
            name: string;
            placeholder: string;
            readOnly: true | undefined;
            value: string;
            onFocus: ((e: FocusGainedEvent) => void) | undefined;
            onSearch: ((e: TermChangedEvent) => void) | undefined;
            onEscape: () => Search<V>;
            onBlur: ((e: FocusLostEvent) => void) | undefined;
        };
        menu: {
            wml: {
                id: string;
            };
            name: string;
            block: boolean;
            onSelect: (e: ItemSelectedEvent<V>) => void;
            itemTemplate: ItemTemplate<V> | undefined;
            noItemsTemplate: import("@quenk/wml").Fun | undefined;
            stringifier: Stringifier<V> | undefined;
        };
    };
    set(value: string): Search<V>;
    /**
     * update the Select with new item options to
     * present to the user.
     */
    update(results: V[]): Search<V>;
    /**
     * open the results menu.
     */
    open(): Search<V>;
    /**
     * close the results menu.
     */
    close(): Search<V>;
}
/**
 * updateMenu will cause the menu to be displayed with new items.
 */
export declare const updateMenu: <V>(view: View, id: string, results: V[]) => void;
/**
 * openMenu will cause the menu to be displayed with whatever contents
 * were previously set.
 */
export declare const openMenu: <V>(view: View, id: string) => void;
/**
 * closeMenu will cause the menu to no longer be displayed.
 */
export declare const closeMenu: <V>(view: View, id: string) => void;
