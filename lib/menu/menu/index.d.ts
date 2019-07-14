import * as hidden from '../../content/state/hidden';
import { View, Component, Content } from '@quenk/wml';
import { WidgetAttrs, HTMLElementAttrs } from '../../';
export declare const MENU = "ww-menu";
export declare const MENU_HEADER_ITEM = "ww-menu__header-item";
export declare const NAV_MODE = "nav";
export declare const CONTENT_MODE = "content";
/**
 * MenuAttrs
 */
export interface MenuAttrs extends HTMLElementAttrs {
    /**
     * hidden indicates the menu should be hidden.
     */
    hidden?: boolean;
    /**
     * block display
     */
    block?: boolean;
}
/**
 * HeaderAttrs
 */
export interface HeaderAttrs extends HTMLElementAttrs {
    /**
     * text
     */
    text: string;
}
/**
 * HeaderItem
 */
export declare class HeaderItem extends Component<WidgetAttrs<HeaderAttrs>> {
    view: View;
    values: {
        root: {
            className: string;
            content: Content[];
        };
    };
}
/**
 * Menu provides a DOM container for rendering
 * a dropdown style menu.
 */
export declare class Menu extends Component<WidgetAttrs<MenuAttrs>> implements hidden.Hidable {
    view: View;
    values: {
        root: {
            wml: {
                id: string;
            };
            id: string;
            className: string;
        };
        menu: {
            id: string;
        };
        content: () => Content[];
    };
    isHidden(): boolean;
    hide(): Menu;
    show(): Menu;
    toggle(): Menu;
    setContent(content: Content[]): Menu;
}
