import * as views from './wml/menu-icon';
import { View, Component } from '@quenk/wml';
import { StylableAttrs, WidgetAttrs } from '../../../';

///classNames:begin
export const MENU_ICON = 'ww-menu-icon';
export const MENU_ICON_DASH = 'ww-menu-icon__dash';
///classNames:end

/**
 * MenuIconAttrs
 */
export interface MenuIconAttrs extends StylableAttrs { }

/**
 * MenuIcon provides a css implement icon normally used 
 * to toggle a side menu.
 */
export class MenuIcon extends Component<WidgetAttrs<MenuIconAttrs>> {

    view: View = new views.Main(this);

    values = {

        root: {

            id: 'root',
            class: MENU_ICON

        },
        dash: {

            id: 'dash',
            class: MENU_ICON_DASH

        }

    }

}
