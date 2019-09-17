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

            (this.attrs.ww && this.attrs.ww.size) ?
                getSizeClassName(this.attrs.ww.size) : '',

            (this.attrs.ww && this.attrs.ww.block) ?
                BLOCK : ''),

        name: getName(this.attrs),

        value: (this.attrs.ww && this.attrs.ww.value),

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

            placeholder: () => {

                if (this.attrs.ww) {

                    if (this.attrs.ww.options && this.values.value)
                        return getCurrent(this.attrs.ww.options,
                            this.values.value);

                    return this.attrs.ww.placeholder || 'Select one';

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

            name: (this.attrs.ww && this.attrs.ww.name) ?
                this.attrs.ww.name : '',

            block: (this.attrs.ww && this.attrs.ww.block) ?
                this.attrs.ww.block : false,

            hidden: true,

            results: (this.attrs.ww && this.attrs.ww.options) ?
                this.attrs.ww.options : [],

            onSelect: (e: ItemSelectedEvent<Option<V>>) => {

                if (this.attrs.ww && this.attrs.ww.onSelect)
                    this.attrs.ww.onSelect(
                        new ItemSelectedEvent(e.name, e.value.value));

                this.values.value = e.value.value;

                this.view.invalidate();

            },
            itemTemplate: (this.attrs.ww && this.attrs.ww.itemTemplate) ?
                this.attrs.ww.itemTemplate : undefined,

            noItemsTemplate: (this.attrs.ww && this.attrs.ww.noItemsTemplate) ?
                this.attrs.ww.noItemsTemplate : undefined,

            stringifier: (this.attrs.ww && this.attrs.ww.stringifier) ?
                this.attrs.ww.stringifier : (v: Option<V>) => v.label

        }

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
