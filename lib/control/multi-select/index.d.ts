import { View } from '@quenk/wml';
import { Event } from '../';
import { FeedbackControlAttrs, GenericFeedbackControl } from '../feedback';
import { FormControlAttrs } from '../form';
import { TermChangedEvent, ItemChangedEvent } from '../select';
import { StackChangedEvent } from '../stack';
export { TermChangedEvent };
export declare const MULTI_SELECT = "ww-multi-select";
/**
 * MultiSelectAttrs
 */
export interface MultiSelectAttrs<V> extends FormControlAttrs<V[]>, FeedbackControlAttrs<V[]> {
    /**
     * onSearch receives events from the SearchControl.
     */
    onSearch?: (s: TermChangedEvent) => void;
    /**
     * onChange handler.
     */
    onChange?: (e: ItemsChangedEvent<V>) => void;
    /**
     * decorator is to the Stack control.
     */
    decorator?: (m: V) => string;
}
/**
 * ItemsChangedEvent
 */
export declare class ItemsChangedEvent<V> extends Event<V[]> {
}
/**
 * MultiSelect provides a control for allowing a user to select
 * multiple items from a list.
 *
 * It use a stack to display the selected items.
 *
 *     +=========================+
 *     |  <select>               |
 *     +=========================+
 *     +-------------------------+
 *     |   <item>              x |
 *     +-------------------------+
 *     +-------------------------+
 *     |   <item>              x |
 *     +-------------------------+
 *     +-------------------------+
 *     |   <item>              x |
 *     +-------------------------+
 */
export declare class MultiSelect<V> extends GenericFeedbackControl<V[], MultiSelectAttrs<V>> {
    view: View;
    values: {
        id: {
            root: string;
            input: string;
            search: string;
            message: string;
        };
        root: {
            id: string;
            class: string;
        };
        label: {
            id: string;
            text: string;
        };
        search: {
            id: string;
            name: string;
            value: string;
            onSearch: (evt: TermChangedEvent) => void;
            onChange: ({ value }: ItemChangedEvent<V>) => MultiSelect<V>;
        };
        messages: {
            id: string;
            success: string;
            error: string;
            warning: string;
        };
        stack: {
            id: string;
            name: string;
            value: V[];
            decorator: (m: V) => string;
            onChange: (e: StackChangedEvent<V>) => void;
        };
    };
    /**
     * update the list of available options displayed to the user.
     */
    update(list: V[]): MultiSelect<V>;
    /**
     * push a value onto the stack.
     */
    push(v: V): MultiSelect<V>;
}
