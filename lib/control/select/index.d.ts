import * as views from './wml/select';
import { Fun } from '@quenk/wml';
import { FeedbackControlAttrs, AbstractFeedbackControl } from '../feedback';
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
export declare type ItemContentTemplate<V> = (s: Select<V>) => (option: V) => (index: number) => Fun;
/**
 * EmpFun for rendering when there are no results.
 */
export declare type NoItemsTemplate<V> = (s: Select<V>) => Fun;
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
      * inputClassName is the class list for the input.
      */
    inputClassName?: string;
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
     * onChange handler.
     */
    onChange?: (e: ItemChangedEvent<V>) => void;
    /**
     * onSearch handler.
     */
    onSearch?: (e: TermChangedEvent) => void;
}
/**
 * ItemChangedEvent
 */
export declare class ItemChangedEvent<V> extends ControlEvent<V> {
}
export declare class Select<V> extends AbstractFeedbackControl<V, SelectAttrs<V>> {
    view: views.Main<V>;
    values: {
        root: {
            wml: {
                id: string;
            };
            id: string;
            className: string;
        };
        control: {
            wml: {
                id: string;
            };
        };
        messages: {
            wml: {
                id: string;
            };
        };
        input: {
            wml: {
                id: string;
            };
        };
        menu: {
            wml: {
                id: string;
            };
            hide: boolean;
            options: V[];
        };
        label: {
            id: string;
            text: string;
        };
        search: {
            wml: {
                id: string;
            };
            name: string;
            className: string;
            placeholder: string;
            readOnly: boolean | undefined;
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
