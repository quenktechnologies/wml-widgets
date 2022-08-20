import * as wml from '@quenk/wml';
import * as util from '../../util';

import { mapTo, merge, Record } from '@quenk/noni/lib/data/record';

import { VERTICAL } from '../../content/orientation';
import { HTMLElementAttrs } from '../../';
import { LinkAttrs } from '../../content/link';
import { MenuHeaderAttrs } from '../header';
import { NavMenuView } from './view';
import { isFunction, isObject, isString } from '@quenk/noni/lib/data/type';

export { Item } from '../item';
export { Link } from '../../content/link';

///classNames:begin
export const NAV_MENU = 'ww-nav-menu';
///classNames:end

/**
 * MenuItemSpec specifies configuration for the menu items in a NavMenu.
 *
 * This type requires less boilerplate than the MenuItemInfo type and is expanded
 * internally before use.
 */
export type MenuItemSpec
    = LinkMap
    | HeaderText
    | MenuItemSpec[]
    ;

/**
 * LinkText is the text users see when viewing a link.
 */
export type LinkText = string;

/**
 * LinkTarget is the value used for a link's href.
 */
export type LinkTarget = string;

/**
 * LinkHandler is a function executed whenever a link is clicked.
 */
export type LinkHandler = (name: LinkName) => void;

/**
 * LinkName is used to distinguish links.
 *
 * Can be the same value as the link's text attribute.
 */
export type LinkName = string;

/**
 * HeaderText is text used to display a header in the menu.
 */
export type HeaderText = string;

/**
 * LinkMap provides a mapping of link text values to one of the href target,
 * onClick handler or attributes of a link.
 *
 * When normalized, the key (link text) is used as the link name if none is
 * specified.
 */
export interface LinkMap
    extends
    Record<LinkTarget | LinkHandler | LinkAttrs> { }

/**
 * MenuItemInfo is a specifier for one of the supported automatic nav menu items.
 *
 * This is the expanded form of MenuItemSpec.
 */
export type MenuItemInfo
    = LinkInfo
    | HeaderInfo
    | MenuInfo
    ;

/**
 * HeaderInfo specifies the properties to form a header menu item.
 */
export interface HeaderInfo extends MenuHeaderAttrs {

    type: 'header'

}

/**
 * LinkInfo specifies the properties to form a link menu item.
 */
export interface LinkInfo extends LinkAttrs {

    type: 'link'

}

/**
 * MenuInfo specifies the properties to form a sub-menu menu item.
 */
export interface MenuInfo extends NavMenuAttrs {

    type: 'menu'

}

/**
 * NavMenuAttrs
 */
export interface NavMenuAttrs extends HTMLElementAttrs {

    /**
     * vertical indicates whether to display the nav
     * vertically or horizontally (default).
     */
    vertical?: boolean,

    /**
     * items is a list of specifiers that will be turned into their respective
     * nav menu items.
     *
     * Either a record of links can be specified for a simple nav menu or a
     * list of MenuItemSpecs for more complex layouts.
     */
    items?: LinkMap | MenuItemSpec[]

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

        className: util.concat(NAV_MENU, this.attrs.className,
            this.attrs.vertical ? VERTICAL : ''),

        items: expand(this.attrs.items || [])

    }

}

const expand = (spec: LinkMap | MenuItemSpec[]): MenuItemInfo[] => {

    let list: MenuItemSpec[] = Array.isArray(spec) ? spec : [spec];

    return list.reduce((expanded: MenuItemInfo[], item: MenuItemSpec) => {

        if (isString(item)) {

            return [...expanded, <HeaderInfo>{ type: 'header', text: item }];

        } else if (isObject(item)) {

            return <MenuItemInfo[]>[...expanded,
            mapTo(<LinkMap>item, (val, text) => {

                if (isFunction(val))
                    return { type: 'link', name: text, text, onClick: val }
                else if (isObject(val))
                    return merge({ type: 'link', name: text, text }, val)
                else
                    return { type: 'link', name: text, text, href: String(val) }

            })];

        } else if (Array.isArray(item)) {

            return [...expanded, <MenuInfo>{ type: 'menu', items: item }];

        } else {

            return expanded;

        }
    }, <MenuItemInfo[]>[]);

}
