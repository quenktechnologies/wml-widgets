import * as wml from '@quenk/wml';
import { Record } from '@quenk/noni/lib/data/record';
import { HTMLElementAttrs } from '../../';
import { LinkAttrs } from '../../content/link';
import { MenuHeaderAttrs } from '../header';
export { Item } from '../item';
export { Link } from '../../content/link';
export declare const NAV_MENU = "ww-nav-menu";
/**
 * MenuItemSpec specifies configuration for the menu items in a NavMenu.
 *
 * This type requires less boilerplate than the MenuItemInfo type and is expanded
 * internally before use.
 */
export type MenuItemSpec = LinkMap | HeaderText | MenuItemSpec[];
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
export interface LinkMap extends Record<LinkTarget | LinkHandler | LinkAttrs> {
}
/**
 * MenuItemInfo is a specifier for one of the supported automatic nav menu items.
 *
 * This is the expanded form of MenuItemSpec.
 */
export type MenuItemInfo = LinkInfo | HeaderInfo | MenuInfo;
/**
 * HeaderInfo specifies the properties to form a header menu item.
 */
export interface HeaderInfo extends MenuHeaderAttrs {
    type: 'header';
}
/**
 * LinkInfo specifies the properties to form a link menu item.
 */
export interface LinkInfo extends LinkAttrs {
    type: 'link';
}
/**
 * MenuInfo specifies the properties to form a sub-menu menu item.
 */
export interface MenuInfo extends NavMenuAttrs {
    type: 'menu';
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
    items?: LinkMap | MenuItemSpec[];
}
/**
 * NavMenu groups one or more navigational items together to form a menu.
 *
 * Items may be declared directly as child elements of this widgets or specified
 * via attributes for dynamic creation.
 */
export declare class NavMenu extends wml.Component<NavMenuAttrs> {
    view: wml.View;
    values: {
        id: string | undefined;
        className: string;
        items: MenuItemInfo[];
    };
}
