import * as hidden from '../../content/state/hidden';
import { View, Component } from '@quenk/wml';
import { WidgetAttrs, StylableAttrs } from '../../';
export { Item } from '../../content/nav/item';
export declare const MENU = "ww-menu";
export declare const MENU_DIVIDER = "ww-menu__divider";
export declare const MENU_HEADER = "ww-menu__header";
export declare const NAV_MODE = "nav";
export declare const CONTENT_MODE = "content";
/**
 * MenuAttrs
 */
export interface MenuAttrs extends StylableAttrs {
    /**
     * hidden indicates the menu should be hidden.
     */
    hidden?: boolean;
}
/**
 * HeaderAttrs
 */
export interface HeaderAttrs extends StylableAttrs {
    /**
     * text
     */
    text: string;
}
/**
 * Header
 */
export declare class Header extends Component<WidgetAttrs<HeaderAttrs>> {
    view: View;
    values: {
        root: {
            class: string;
        };
        text: string;
    };
}
/**
 * Divider
 */
export declare class Divider extends Component<WidgetAttrs<StylableAttrs>> {
    view: View;
    values: {
        root: {
            class: string;
        };
    };
}
/**
 * Menu provides a DOM container for rendering
 * a dropdown style menu.
 */
export declare class Menu extends Component<WidgetAttrs<MenuAttrs>> implements hidden.Hidable {
    view: View;
    isHidden: hidden.IsHidden;
    hide: hidden.Hide<Menu>;
    show: hidden.Show<Menu>;
    toggle: hidden.Toggle<Menu>;
    values: {
        root: {
            id: string;
            class: string;
        };
        menu: {
            id: string;
        };
        content: () => (Element | Node | HTMLElement)[];
    };
    /**
     * setContent of this Menu.
     */
    setContent(view: View): Menu;
}
