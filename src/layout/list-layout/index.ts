import * as wml from '@quenk/wml';
import * as item from './wml/list-layout-item';
import * as layout from './wml/list-layout';
import { concat } from '../../util';
import { WidgetAttrs, StylableAttrs } from '../../';

///classNames:begin
export const LIST_LAYOUT = 'ww-list-layout';
export const LIST_LAYOUT_ITEM = 'ww-list-layout__item';
///classNames:end

/**
 * ListLayoutAttrs
 */
export interface ListLayoutAttrs extends StylableAttrs { }

/**
 * ListLayoutItemAttrs
 */
export interface ListLayoutItemAttrs extends StylableAttrs { }


/**
 * ListLayoutItem 
 */
export class ListLayoutItem extends wml.Component<WidgetAttrs<ListLayoutItemAttrs>> {

    view: wml.View = new item.Main(this);

    values = {

        root: {

            class: LIST_LAYOUT_ITEM

        }

    }

}

/**
 * ListLayout is used to create a vertical list of content.
 *
 * Children must be ListGroupItems.
 */
export class ListLayout extends wml.Component<WidgetAttrs<ListLayoutAttrs>> {

    view: wml.View = new layout.Main(this);

    values = {

        root: {

            class: concat(LIST_LAYOUT, this.attrs.ww && this.attrs.ww.class)

        }

    }

}


