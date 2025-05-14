import * as views from './wml/stack-select';

import { View } from '@quenk/wml';
import { BLOCK } from '../../content/orientation';
import {
    FormControlAttrs,
    AbstractFormControl,
    getLabel,
    setMessage,
    removeMessage
} from '../form';
import { TermChangedEvent, ItemSelectedEvent } from '../search';
import { StackChangedEvent, Stack } from '../stack';
import { update } from '../select';
import { concat } from '../../util';
import { getId, getClassName } from '../../';
import { Event, getName } from '../';
import { getMessage, getValidityClassName, Message } from '../feedback';

export { TermChangedEvent };

///classNames:begin
export const STACK_SELECT = 'ww-stack-select';
///classNames:end

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
     * placeholder
     */
    placeholder?: string;

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
export class ItemsChangedEvent<V> extends Event<V[]> {}

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
export class StackSelect<V> extends AbstractFormControl<
    V[],
    StackSelectAttrs<V>
> {
    view: View = new views.Main(this);

    values = {
        root: {
            wml: {
                id: 'root'
            },

            id: getId(this.attrs),

            className: concat(
                STACK_SELECT,
                getClassName(this.attrs),
                getValidityClassName(this.attrs),
                this.attrs && this.attrs.block ? BLOCK : ''
            ),

            dir: this.attrs && this.attrs.dir ? this.attrs.dir : 1
        },
        control: {
            wml: {
                id: 'root'
            }
        },
        label: {
            wml: {
                id: 'label'
            },
            text: getLabel(this.attrs)
        },
        search: {
            wml: {
                id: 'search'
            },
            name: this.attrs && this.attrs.name ? this.attrs.name : '',

            value: <any>undefined,

            block: true,

            disabled:
                this.attrs && this.attrs.disabled ? this.attrs.disabled : false,

            placeholder: (this.attrs && this.attrs.placeholder) || '',

            onSearch: (evt: TermChangedEvent) => {
                if (this.attrs && this.attrs.onSearch) this.attrs.onSearch(evt);
            },
            onSelect: ({ value }: ItemSelectedEvent<V>) => this.push(value)
        },
        messages: {
            wml: {
                id: 'message'
            },
            text: getMessage(this.attrs)
        },
        stack: {
            wml: {
                id: 'stack'
            },

            name: getName(this.attrs),

            disabled:
                this.attrs && this.attrs.disabled ? this.attrs.disabled : false,

            value: this.attrs && this.attrs.value ? this.attrs.value : [],

            decorator:
                this.attrs && this.attrs.stringifier
                    ? this.attrs.stringifier
                    : (v: V) => String(v),

            onChange: (e: StackChangedEvent<V>) => {
                if (this.attrs && this.attrs.onChange) this.attrs.onChange(e);
            }
        }
    };

    setMessage(msg: Message): StackSelect<V> {
        setMessage(this.view, this.values.messages.wml.id, msg);
        return this;
    }

    removeMessage(): StackSelect<V> {
        removeMessage(this.view, this.values.messages.wml.id);
        return this;
    }

    /**
     * update the list of available options displayed to the user.
     */
    update(list: V[]): StackSelect<V> {
        update(this.view, this.values.search.wml.id, list);
        return this;
    }

    /**
     * push a value onto the stack.
     */
    push(v: V): StackSelect<V> {
        this.view
            .findById<Stack<V>>(this.values.stack.wml.id)
            .map(s => s.push(v));

        return this;
    }
}
