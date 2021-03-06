import * as wml from '@quenk/wml';
import * as views from './wml/item';
import {
    Activate,
    activate,
    deactivate
} from '../../content/state/active';
import { ACTIVE } from '../../content/state/active';
import { WidgetAttrs, HTMLElementAttrs } from '../../';
import { concat } from '../../util';

///classNames:begin
export const ITEM = 'ww-menu-item';
export const DIVIDER = '-divider';
///classNames:end

/**
 * ItemAttrs
 */
export interface ItemAttrs extends HTMLElementAttrs {

    /**
     * name of the Item
     */
    name?: string,

    /**
     * active state of the Item
     */
    active?: boolean,

    /**
     * divider flag
     */
    divider?: boolean,

    /**
     * text can be specified to display textual content in the link.
     */
    text?: string,

    /**
     * onClick is applied when the Item is clicked.
     */
    onClick?: (e: ItemClickedEvent) => void,

}

/**
 * ItemClickedEvent is fired when the user clicks on an item in
 * a nav list.
 */
export class ItemClickedEvent {

    constructor(public name: string) { }

}

/**
 * Item wraps content in a navigation list.
 *
 * Items should not have any siblings that are not other Items.
 */
export class Item extends wml.Component<WidgetAttrs<ItemAttrs>> implements
    Activate {

    view: wml.View = new views.Main(this);

    values = {

        root: {

            wml: {

                id: 'root'

            },

            id: (this.attrs.ww && this.attrs.ww.id) ? this.attrs.ww.id : '',

            className: concat(ITEM,
                (this.attrs.ww && this.attrs.ww.active) ? ACTIVE : '',
                (this.attrs.ww && this.attrs.ww.divider) ? DIVIDER : ''),

            content: {

                render: () => {

                    if (this.attrs.ww && this.attrs.ww.divider)
                        return [];
                    else if (this.attrs.ww && this.attrs.ww.text)
                        return [document.createTextNode(this.attrs.ww.text)]
                    else
                        return this.children

                }

            }

        }

    }

    activate(): Item {

        activate(this.view, this.values.root.wml.id);
        return this;

    }

    deactivate(): Item {

        deactivate(this.view, this.values.root.wml.id);
        return this;

    }

}
