import { View } from '@quenk/wml';
import { ControlAttrs, Event, GenericControl } from '../';
import { TermChangedEvent, ItemSelectedEvent } from '../select';
import { StackChangedEvent } from '../stack';
export { TermChangedEvent };
export declare const MULTI_SELECT = "ww-multi-select";
/**
 * MultiSelectAttrs
 */
export interface MultiSelectAttrs<V> extends ControlAttrs<V[]> {
    /**
     * onSearch receives events from the SearchControl.
     */
    onSearch?: (s: TermChangedEvent) => void;
    /**
     * onChange handler.
     */
    onChange?: (e: SelectionChangedEvent<V>) => void;
    /**
     * decorator is to the Stack control.
     */
    decorator?: (m: V) => string;
}
/**
 * SelectionChangedEvent
 */
export declare class SelectionChangedEvent<V> extends Event<V[]> {
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
export declare class MultiSelect<V> extends GenericControl<V[], MultiSelectAttrs<V>> {
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
        help: {
            id: string;
        };
        search: {
            id: string;
            name: string;
            value: string;
            onSearch: (evt: TermChangedEvent) => void;
            onSelect: ({ value }: ItemSelectedEvent<V>) => MultiSelect<V>;
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
