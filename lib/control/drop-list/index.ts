import * as views from './wml/drop-list';

import { View } from '@quenk/wml';

import { concat } from '../../util';
import { Size, getSizeClassName } from '../../content/size';
import { BLOCK } from '../../content/orientation';
import {
    ItemSelectedEvent,
    ItemTemplate,
    NoItemsTemplate,
    Stringifier
} from '../results-menu';
import { openMenu, closeMenu, toggleMenu } from '../search';
import { getId, getClassName } from '../../';
import { ControlAttrs, getName, AbstractControl } from '../';

export {
    ItemTemplate,
    NoItemsTemplate,
    ItemSelectedEvent
}

///classNames:begin
export const DROP_LIST = 'ww-drop-list';
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
 * DropListAttrs 
 */
export interface DropListAttrs<V> extends ControlAttrs<V> {

    /**
     * block display
     */
    block?: boolean,

    /**
     * size 
     */
    size?: Size,

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
     * onSelect is applied when the user selects an item.
     */
    onSelect?: (e: ItemSelectedEvent<V>) => void,

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
    noItemsTemplate?: NoItemsTemplate

}

/**
 * DropList provides a control for making a selection from a list of choices.
 */
export class DropList<V> extends AbstractControl<V, DropListAttrs<V>> {

    view: View = new views.Main(this);

    values = {

        id: getId(this.attrs),

        className: concat(DROP_LIST,

            getClassName(this.attrs),

            (this.attrs && this.attrs.size) ?
                getSizeClassName(this.attrs.size) : '',

            (this.attrs && this.attrs.block) ?
                BLOCK : ''),

        name: getName(this.attrs),

        value: (this.attrs && this.attrs.value),

        control: {

            wml: {

                id: 'drop-list'

            }

        },
        messages: {

            wml: {

                id: 'messages'

            }

        },

        display: {

            disabled: (this.attrs && this.attrs.disabled),

            placeholder: () => {

                if (this.attrs) {

                    if (this.attrs.options && this.values.value)
                        return getCurrent(this.attrs.options,
                            this.values.value);

                    return this.attrs.placeholder || 'Select one';

                }

            },
            onClick: () => {

                this.toggle();

            }

        },

        menu: {

            wml: {

                id: 'menu'

            },

            name: (this.attrs && this.attrs.name) ?
                this.attrs.name : '',

            block: (this.attrs && this.attrs.block) ?
                this.attrs.block : false,

            hidden: true,

            results: (this.attrs && this.attrs.options) ?
                this.attrs.options : [],

            onSelect: (e: ItemSelectedEvent<Option<V>>) => {

                if (this.attrs && this.attrs.onSelect)
                    this.attrs.onSelect(
                        new ItemSelectedEvent(e.name, e.value.value));

                this.values.value = e.value.value;

                this.view.invalidate();

            },
            itemTemplate: (this.attrs && this.attrs.itemTemplate) ?
                this.attrs.itemTemplate : undefined,

            noItemsTemplate: (this.attrs && this.attrs.noItemsTemplate) ?
                this.attrs.noItemsTemplate : undefined,

            stringifier: (this.attrs && this.attrs.stringifier) ?
                this.attrs.stringifier : (v: Option<V>) => v.label

        }

    }

    /**
     * update changes the options available in the list.
     *
     * The view will be invalidated.
     */
    update(options: Option<V>[]): DropList<V> {

        this.values.menu.results = options;

        this.view.invalidate();

        return this;

    }

    /**
     * open the results menu.
     */
    open(): DropList<V> {

        openMenu(this.view, this.values.menu.wml.id);
        return this;

    }

    /**
     * close the results menu.
     */
    close(): DropList<V> {

        closeMenu(this.view, this.values.menu.wml.id);
        return this;

    }

    /**
     * toggle the results menu.
     */
    toggle(): DropList<V> {

        toggleMenu(this.view, this.values.menu.wml.id);
        return this;

    }

}

const getCurrent = <V>(opts: Option<V>[], value: V, text = 'Select one') =>
    opts.reduce((p, c) => c.value === value ? c.label : p, text);
