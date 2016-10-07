import { View, Widget } from 'wmljs/lib/runtime';
import menu_button from './wml/menu_button.wml';

/**
 * MenuButton provides a 'hamburger' menu button.
 */
class MenuButton extends Widget {

    clicked(e) {

        this.attributes.read('wat:onClick', function() {})();

    }

    render() {

        return View.render(menu_button, this);

    }


}

export default MenuButton
