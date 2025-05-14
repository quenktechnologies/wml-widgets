import * as wml from '@quenk/wml';
import * as util from '../../util';

export { Link } from '../../content/link';
import { VERTICAL } from '../../content/orientation';
import { HTMLElementAttrs } from '../../';
import { LinkType, MenuHeaderType, MenuItemSpecType } from '../menu';
import { NavMenuView } from './view';

export { Item } from '../item';

///classNames:begin
export const NAV_MENU = 'ww-nav-menu';
///classNames:end

/**
 * MenuItemInfo is a specifier for one of the supported automatic nav menu items.
 *
 * This is the expanded form of MenuItemSpec.
 */
export type MenuItemInfo = LinkType | MenuHeaderType | MenuInfo;

/**
 * MenuInfo specifies the properties to form a sub-menu menu item.
 */
export interface MenuInfo extends NavMenuAttrs {
    type: MenuItemSpecType;
}

/**
 * NavMenuAttrs
 */
export interface NavMenuAttrs extends HTMLElementAttrs {
    /**
     * vertical indicates whether to display the nav
     * vertically or horizontally (default).
     */
    vertical?: boolean;

    /**
     * items is a list of specifiers that will be turned into their respective
     * nav menu items.
     *
     * Either a record of links can be specified for a simple nav menu or a
     * list of MenuItemSpecs for more complex layouts.
     */
    items?: MenuItemInfo[];
}

/**
 * NavMenu groups one or more navigational items together to form a menu.
 *
 * Items may be declared directly as child elements of this widgets or specified
 * via attributes for dynamic creation.
 */
export class NavMenu extends wml.Component<NavMenuAttrs> {
    view: wml.View = new NavMenuView(this);

    values = {
        id: this.attrs.id,

        className: util.concat(
            NAV_MENU,
            this.attrs.className,
            this.attrs.vertical ? VERTICAL : ''
        ),

        items: this.attrs.items || []
    };
}
