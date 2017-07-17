import { AbstractWidget } from '@quenk/wml/lib/runtime';
import { Main } from './wml/menu_button';

/**
 * MenuButton provides a 'hamburger' menu button.
 */
export class MenuButton extends AbstractWidget {

    view = new Main(this);

}

export default MenuButton
