import { View } from '@quenk/wml';
import { FormControlAttrs, AbstractFormControl } from '../form';
import { TermChangedEvent, ItemSelectedEvent } from '../search';
import { StackChangedEvent } from '../stack';
import { Event } from '../';
import { Message } from '../feedback';
export { TermChangedEvent };
export declare const STACK_SELECT = "ww-stack-select";
/**
 * StackSelectAttrs
 */
export interface StackSelectAttrs<V> extends FormControlAttrs<V[]> {
    /**
     * dir indicates which direction the stack should grow,
     * 1 for ascending -1 for descending.
     */
    dir?: number;
    /**
     * block flag
     */
    block?: boolean;
    /**
     * disabled
     */
    disabled?: boolean;
    /**
     * onSearch receives events from the SearchControl.
     */
    onSearch?: (s: TermChangedEvent) => void;
    /**
     * onChange handler.
     */
    onChange?: (e: ItemsChangedEvent<V>) => void;
    /**
     * stringifier
     */
    stringifier?: (m: V) => string;
}
/**
 * ItemsChangedEvent
 */
export declare class ItemsChangedEvent<V> extends Event<V[]> {
}
/**
 * StackSelect provides a control for allowing a user to select
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
export declare class StackSelect<V> extends AbstractFormControl<V[], StackSelectAttrs<V>> {
    view: View;
    values: {
        root: {
            wml: {
                id: string;
            };
            id: string;
            className: string;
            dir: number;
        };
        control: {
            wml: {
                id: string;
            };
        };
        label: {
            wml: {
                id: string;
            };
            text: string;
        };
        search: {
            wml: {
                id: string;
            };
            name: string;
            value: any;
            block: boolean;
            disabled: boolean;
            onSearch: (evt: TermChangedEvent) => void;
            onSelect: ({ value }: ItemSelectedEvent<V>) => StackSelect<V>;
        };
        messages: {
            wml: {
                id: string;
            };
            text: string;
        };
        stack: {
            wml: {
                id: string;
            };
            name: string;
            disabled: boolean;
            value: V[];
            decorator: (m: V) => string;
            onChange: (e: StackChangedEvent<V>) => void;
        };
    };
    setMessage(msg: Message): StackSelect<V>;
    removeMessage(): StackSelect<V>;
    /**
     * update the list of available options displayed to the user.
     */
    update(list: V[]): StackSelect<V>;
    /**
     * push a value onto the stack.
     */
    push(v: V): StackSelect<V>;
}
