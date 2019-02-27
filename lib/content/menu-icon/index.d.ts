import { View, Component } from '@quenk/wml';
import { HTMLElementAttrs, WidgetAttrs } from '../../';
export declare const MENU_ICON = "ww-menu-icon";
export declare const MENU_ICON_DASH = "ww-menu-icon__dash";
/**
 * MenuIconAttrs
 */
export interface MenuIconAttrs extends HTMLElementAttrs {
}
/**
 * MenuIcon provides a css implement icon normally used
 * to toggle a side menu.
 */
export declare class MenuIcon extends Component<WidgetAttrs<MenuIconAttrs>> {
    view: View;
    values: {
        root: {
            id: string;
            className: string;
        };
        dash: {
            id: string;
            class: string;
        };
    };
}
