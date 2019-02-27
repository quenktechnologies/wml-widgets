import * as views from './wml/multi-select';
import { View } from '@quenk/wml';
import { concat } from '../../util';
import { Event } from '../';
import { FeedbackControlAttrs, AbstractFeedbackControl } from '../feedback';
import { FormControlAttrs } from '../form';
import { TermChangedEvent, ItemChangedEvent } from '../select';
import { StackChangedEvent, Stack } from '../stack';
import { Select } from '../select';
import { getId, getClassName } from '../../';
import { getName } from '../';

export { TermChangedEvent }

///classNames:begin
export const MULTI_SELECT = 'ww-multi-select';
///classNames:end

/**
 * MultiSelectAttrs
 */
export interface MultiSelectAttrs<V> extends
    FormControlAttrs<V[]>,
    FeedbackControlAttrs<V[]> {

    /**
     * onSearch receives events from the SearchControl.
     */
    onSearch?: (s: TermChangedEvent) => void

    /**
     * onChange handler.
     */
    onChange?: (e: ItemsChangedEvent<V>) => void,

    /**
     * decorator is to the Stack control.
     */
    decorator?: (m: V) => string

}

/**
 * ItemsChangedEvent
 */
export class ItemsChangedEvent<V> extends Event<V[]> { }

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
export class MultiSelect<V>
    extends AbstractFeedbackControl<V[], MultiSelectAttrs<V>> {

    view: View = new views.Main(this);

    values = {

        root: {

            wml: {

                id: 'root'

            },

            id: getId(this.attrs),

            className: concat(MULTI_SELECT, getClassName(this.attrs))

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
            text: (this.attrs.ww && this.attrs.ww.label) ?
                this.attrs.ww.label : ''

        },
        search: {

            wml: {
                id: 'search'
            },
            name: (this.attrs.ww && this.attrs.ww.name) ?
                this.attrs.ww.name : '',

          value:<any> undefined,

            onSearch: (evt: TermChangedEvent) => {

                if (this.attrs.ww && this.attrs.ww.onSearch)
                    this.attrs.ww.onSearch(evt);

            },
            onChange: ({ value }: ItemChangedEvent<V>) => this.push(value)

        },
        messages: {

            wml: {

                id: 'message'

            }

        },
        stack: {

            wml: {

                id: 'stack'
            },

            name: getName(this.attrs),

            value: (this.attrs.ww && this.attrs.ww.value) ?
                this.attrs.ww.value : [],

            decorator: (this.attrs.ww && this.attrs.ww.decorator) ?
                this.attrs.ww.decorator : (v: V) => String(v),

            onChange: (e: StackChangedEvent<V>) => {

                if (this.attrs.ww && this.attrs.ww.onChange)
                    this.attrs.ww.onChange(e);

            }

        }
    };

    /**
     * update the list of available options displayed to the user.
     */
    update(list: V[]): MultiSelect<V> {

        this
            .view
            .findById<Select<V>>(this.values.search.wml.id)
            .map(s => s.update(list));

        return this;

    }

    /**
     * push a value onto the stack.
     */
    push(v: V): MultiSelect<V> {

        this
            .view
            .findById<Stack<V>>(this.values.stack.wml.id)
            .map(s => s.push(v));

        return this;

    }

}
