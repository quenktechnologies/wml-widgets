import { Maybe } from '@quenk/noni/lib/data/maybe';
import { View } from '@quenk/wml';

import { concat, getById } from '../../util';
import {
    Message,
    getValidityClassName,
    getMessage,
} from '../feedback';
import {
    ItemSelectedEvent,
    ItemTemplate,
    NoItemsTemplate,
    Stringifier
} from '../results-menu';
import { ItemChangedEvent } from '../select';
import { FormControlAttrs, AbstractFormControl, getLabel } from '../form';
import { Help } from '../help';
import { Option } from '../drop-list';
import { getId, getClassName } from '../../';
import { getName } from '../';
import { Main } from './wml/drop-list-field';

export { ItemTemplate, NoItemsTemplate, ItemChangedEvent }

///classNames:begin
export const DROP_LIST_FIELD = 'ww-drop-list-field';
///classNames:end

/**
 * DropListFieldAttrs
 */
export interface DropListFieldAttrs<V> extends FormControlAttrs<V> {

    /**
     * placeholder 
     */
    placeholder?: string,

    /**
     * disabled
     */
    disabled?: boolean,

    /**
     * options available for selection.
     */
    options?: Option<V>[];

    /**
     * stringifier
     */
    stringifier?: Stringifier<Option<V>>,

    /**
     * itemTemplate if specified will be used to render each
     * result item.
     */
    itemTemplate?: ItemTemplate<Option<V>>,

    /**
     * noItemsTemplate for rendering the lack of search results.
     */
    noItemsTemplate?: NoItemsTemplate,

    /**
     * onChange is applied when the user selects an item.
     */
    onChange?: (e: ItemChangedEvent<V>) => void,

}

/**
 * DropListField 
 */
export class DropListField<V>
    extends
    AbstractFormControl<V, DropListFieldAttrs<V>> {

    view: View = new Main(this);

    values = {

        root: {

            wml: {

                id: 'root'

            },

            id: getId(this.attrs),

            className: concat(DROP_LIST_FIELD, getClassName(this.attrs),
                getValidityClassName(this.attrs))

        },
        messages: {

            wml: {

                id: 'message'

            },
            text: getMessage(this.attrs)

        },

        label: {

            id: getName(this.attrs),

            text: getLabel(this.attrs)

        },
        control: {

            wml: {

                id: 'control'

            },
            name: getName(this.attrs),

            className: getValidityClassName(this.attrs),

            block: true,

            placeholder: (this.attrs && this.attrs.placeholder),

            disabled: (this.attrs && this.attrs.disabled),

            value: (this.attrs && this.attrs.value),

            options: (this.attrs && this.attrs.options) ?
                this.attrs.options : [],

            stringifier: this.attrs && this.attrs.stringifier,

            itemTemplate: (this.attrs && this.attrs.itemTemplate) ?
                this.attrs.itemTemplate : undefined,

            noItemsTemplate: (this.attrs && this.attrs.noItemsTemplate) ?
                this.attrs.noItemsTemplate : undefined,

            onSelect: (e: ItemSelectedEvent<V>) => {

                if (this.attrs && this.attrs.onChange)
                    this.attrs.onChange(
                        new ItemChangedEvent(e.name, e.value));

            },

        }

    };

    setMessage(msg: Message): DropListField<V> {

        getHelp(this).map(h => h.setMessage(msg));
        return this;

    }

    removeMessage(): DropListField<V> {

        getHelp(this).map(h => h.removeMessage());
        return this;

    }

}

const getHelp = <V>(t: DropListField<V>): Maybe<Help> =>
    getById(t.view, t.values.messages.wml.id);
