import * as names from '@package/self/common/names';
import { Component, Attrs } from '@quenk/wml-runtime';
import { Main } from './wml/menu_button';

export interface MenuButtonAttrs extends Attrs {

    ww?: {

        /**
         * onClick is called when the user clicks on the menu button.
         */
        onClick?: (e: Event) => void

    }

}

/**
 * MenuButton provides a 'hamburger' menu button.
 */
export class MenuButton extends Component<MenuButtonAttrs> {

    view = new Main(this);

    values = {

        class: {

            button: names.MENU_BUTTON

        }

    };

}
