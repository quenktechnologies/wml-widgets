import * as wml from '@quenk/wml';
import { HTMLElementAttrs } from '../../';
/**
 * MENU_HEADER
 */
export declare const MENU_HEADER = "ww-menu-header";
/**
 * MenuHeaderAttrs
 */
export interface MenuHeaderAttrs extends HTMLElementAttrs {
    /**
     * text allows the text of the header to be specified.
     */
    text?: string;
}
/**
 * MenuHeader can be used to display non-clickable heading text in a nav menu.
 */
export declare class MenuHeader extends wml.Component<MenuHeaderAttrs> {
    view: wml.View;
    values: {
        span: {
            id: string;
            className: string;
        };
        text: wml.Content[];
    };
}
