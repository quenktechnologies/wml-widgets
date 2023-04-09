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
import { getId, getClassName } from '../../';
import { CONTROL_WRAPPER, getName } from '../';
import { closeMenu, toggleMenu } from '../search';
import { DropDownView } from './views';

export { ItemTemplate, NoItemsTemplate, ItemChangedEvent }

///classNames:begin
export const DROPDOWN = 'ww-dropdown';
export const DROPDOWN_FACADE = 'ww-dropdown-facade';
///classNames:end

/**
 * Option
 */
export interface Option<V> {

    /**
     * label
     */
    label: string,

    /**
     * value
     */
    value: V

}

/**
 * DropDownAttrs
 */
export interface DropDownAttrs<V> extends FormControlAttrs<V> {

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
 * DropDown 
 */
export class DropDown<V>
    extends
    AbstractFormControl<V, DropDownAttrs<V>> {

    view: View = new DropDownView(this);

    values = {

        root: {

            wml: {

                id: 'root'

            },

            id: getId(this.attrs),

            className: concat(DROPDOWN,
                CONTROL_WRAPPER,
                getClassName(this.attrs),
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

        facade: {

            className: DROPDOWN_FACADE,

            onClick: () => this.toggle()

        },
        control: {

            wml: {

                id: 'control'

            },
            name: getName(this.attrs),

            className: getValidityClassName(this.attrs),

            placeholder: () => {

                if (this.attrs) {

                    if (this.attrs.options && this.values.control.value)
                        return getCurrent(this.attrs.options,
                            this.values.control.value);

                    return this.attrs.placeholder || 'Select one';

                }

            },
            disabled: (this.attrs && this.attrs.disabled),

            value: (this.attrs && this.attrs.value),

            options: (this.attrs && this.attrs.options) ?
                this.attrs.options : [],

            stringifier: this.attrs.stringifier ?
                this.attrs.stringifier :
                (opt: Option<V>) => opt.label,

            itemTemplate: (this.attrs && this.attrs.itemTemplate) ?
                this.attrs.itemTemplate : undefined,

            noItemsTemplate: (this.attrs && this.attrs.noItemsTemplate) ?
                this.attrs.noItemsTemplate : undefined,

            hidden: true,

            onSelect: (e: ItemSelectedEvent<Option<V>>) => {

                if (this.attrs && this.attrs.onChange)
                    this.attrs.onChange(
                        new ItemChangedEvent(e.name, e.value.value));

                this.values.control.value = e.value.value;

                this.view.invalidate();

            },

        }

    };

    /**
     * update changes the options available in the list.
     *
     * The view will be invalidated.
     */
    update(options: Option<V>[]): DropDown<V> {

        this.values.control.options = options;

        this.view.invalidate();

        return this;

    }

    /**
      * close the results menu.
      */
    close(): DropDown<V> {

        closeMenu(this.view, this.values.control.wml.id);
        return this;

    }

    /**
     * toggle the results menu.
     */
    toggle(): DropDown<V> {

        toggleMenu(this.view, this.values.control.wml.id);
        return this;

    }

    setMessage(msg: Message): DropDown<V> {

        getHelp(this).map(h => h.setMessage(msg));
        return this;

    }

    removeMessage(): DropDown<V> {

        getHelp(this).map(h => h.removeMessage());
        return this;

    }

}

const getHelp = <V>(t: DropDown<V>): Maybe<Help> =>
    getById(t.view, t.values.messages.wml.id);


const getCurrent = <V>(opts: Option<V>[], value: V, text = 'Select one') =>
    opts.reduce((p, c) => c.value === value ? c.label : p, text);
