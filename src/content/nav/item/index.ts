import * as wml from '@quenk/wml';
import * as views from './wml/item';
import {
    Activatable,
    Activate,
    Deactivate,
    activate,
    deactivate
} from '../../state/active';
import { ACTIVE } from '../../state/active';
import { WidgetAttrs, StylableAttrs } from '../../../';
import { concat } from '../../../util';

const get = (i: Item) =>
    () => i.view.findById(i.values.root.id).map((e: HTMLElement) => e);

///classNames:begin
/**
 * ITEM
 */
export const ITEM = 'ww-item';
///classNames:end

/**
 * ItemAttrs
 */
export interface ItemAttrs extends StylableAttrs {

    /**
     * name of the Item
     */
    name?: string,

    /**
     * active state of the Item
     */
    active?: boolean,

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
    Activatable {

    view: wml.View = new views.Main(this);

    activate: Activate<Item> = activate(this)(get(this));

    deactivate: Deactivate<Item> = deactivate(this)(get(this));

    values = {

        root: {

            id: 'root',

            class: concat(ITEM,
                (this.attrs.ww && this.attrs.ww.active) ? ACTIVE : null)

        },
        content: {

            render: () => (this.attrs.ww && this.attrs.ww.text) ?
                this.attrs.ww.text : this.children

        }


    }

}
