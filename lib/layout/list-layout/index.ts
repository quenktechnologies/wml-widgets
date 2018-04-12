import * as item from './wml/list-layout-item';
import * as layout from './wml/list-layout';
import { View } from '@quenk/wml';
import { concat } from '../../util';
import { LAYOUT, LayoutAttrs, GenericLayout } from '../';

///classNames:begin
export const LIST_LAYOUT = 'ww-list-layout';
export const LIST_LAYOUT_ITEM = 'ww-list-layout__item';
///classNames:end

/**
 * ListLayoutAttrs
 */
export interface ListLayoutAttrs extends LayoutAttrs { }

/**
 * ListLayoutItemAttrs
 */
export interface ListLayoutItemAttrs extends LayoutAttrs { }

/**
 * ListLayoutItem 
 */
export class ListLayoutItem extends GenericLayout<ListLayoutItemAttrs> {

    view: View = new item.Main(this);

    values = {

        content: {

            id: 'item',

            class: LIST_LAYOUT_ITEM

        }

    }

}

/**
 * ListLayout is used to create a vertical list of content.
 *
 * Children must be ListGroupItems.
 */
export class ListLayout extends GenericLayout<ListLayoutAttrs> {

    view: View = new layout.Main(this);

    values = {

        content: {

            id: 'list',

            class: concat(LIST_LAYOUT, LAYOUT, this.attrs.ww && this.attrs.ww.class)

        }

    }

}


