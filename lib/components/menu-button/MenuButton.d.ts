import { Component, Attrs } from '@quenk/wml-runtime';
import { Main } from './wml/menu_button';
export interface MenuButtonAttrs extends Attrs {
    ww?: {
        onClick?: (e: Event) => void;
    };
}
/**
 * MenuButton provides a 'hamburger' menu button.
 */
export declare class MenuButton extends Component<MenuButtonAttrs> {
    view: Main<this>;
}
export default MenuButton;
