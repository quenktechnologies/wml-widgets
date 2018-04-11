import { View, Template } from '@quenk/wml';
import { FeedbackControlAttrs, GenericFeedbackControl } from '../feedback';
import { FormControlAttrs } from '../form';
import { TermChangedEvent } from '../search';
import { Event as ControlEvent } from '../';
export { TermChangedEvent };
export declare const ESCAPE = 27;
export declare const INPUT_ID = "input";
export declare const SELECT = "ww-select";
/**
 * ItemContentTemplate for rending the content of a single search result.
 */
export declare type ItemContentTemplate<V> = (s: Select<V>) => (option: V) => (index: number) => Template;
/**
 * EmpFun for rendering when there are no results.
 */
export declare type NoItemsTemplate<V> = (s: Select<V>) => Template;
export interface SelectAttrs<V> extends FormControlAttrs<V>, FeedbackControlAttrs<V> {
    /**
     * itemContentTemplate if specified will be used to render each
     * result item.
     */
    itemContentTemplate?: ItemContentTemplate<V>;
    /**
     * noItemsTemplate for rendering the lack of search results.
     */
    noItemsTemplate?: NoItemsTemplate<V>;
    /**
      * inputClass is the class list for the input.
      */
    inputClass?: string;
    /**
     * placeholder text for the input.
     */
    placeholder?: string;
    /**
     * readOnly
     */
    readOnly?: boolean;
    /**
     * options to initialize the dropdown list with.
     * These options are displayed by default when
     * the input gains focused.
     */
    options?: V[];
    /**
     * stringifier turns the value to a string.
     */
    stringifier?: (v: V) => string;
    /**
     * native if true, will have the Select
     * behave similarly to a native select element.
     */
    /**
     * onSelect handler.
     */
    onSelect?: (e: ItemSelectedEvent<V>) => void;
    /**
     * onSearch handler.
     */
    onSearch?: (e: TermChangedEvent) => void;
}
/**
 * ItemSelectedEvent
 */
export declare class ItemSelectedEvent<V> extends ControlEvent<V> {
}
export declare class Select<V> extends GenericFeedbackControl<V, SelectAttrs<V>> {
    view: View;
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
            hide: boolean;
            options: V[];
        };
        label: {
            id: string;
            text: string;
        };
        search: {
            id: string;
            class: string;
            placeholder: string;
            readOnly: boolean;
            onFocus: () => void;
            onSearch: (e: TermChangedEvent) => void;
            onEscape: () => Select<V>;
        };
        item: {
            itemContentTemplate: () => ItemContentTemplate<V>;
            noItemsTemplate: () => NoItemsTemplate<V>;
            stringify: (v: V) => string;
            click: (index: string | number) => void;
        };
    };
    handleEvent(e: Event): void;
    open(): Select<V>;
    close(): Select<V>;
    /**
     * update the Select with new item options to
     * present to the user.
     */
    update(results: V[]): Select<V>;
}
