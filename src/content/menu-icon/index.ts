import * as views from './wml/menu-icon';
import { View, Component } from '@quenk/wml';
import { HTMLElementAttrs } from '../../';
import { concat } from '../../util';

///classNames:begin
export const MENU_ICON = 'ww-menu-icon';
export const MENU_ICON_DASH = 'ww-menu-icon__dash';
///classNames:end

/**
 * MenuIconAttrs
 */
export interface MenuIconAttrs extends HTMLElementAttrs {}

/**
 * MenuIcon provides a css implement icon normally used
 * to toggle a side menu.
 */
export class MenuIcon extends Component<MenuIconAttrs> {
    view: View = new views.Main(this);

    values = {
        root: {
            id: this.attrs && this.attrs.id ? this.attrs.id : '',

            className: concat(
                MENU_ICON,
                this.attrs && this.attrs.id ? this.attrs.id : ''
            )
        },
        dash: {
            id: 'dash',
            class: MENU_ICON_DASH
        }
    };
}
