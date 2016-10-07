import { View, Widget } from 'wmljs/lib/runtime';
import menu from './wml/menu.wml';

/**
 * BreadCrumbMenu
 */
class BreadCrumbMenu extends Widget {

    render() {

        return View.render(menu, this);

    }
}

export default BreadCrumbMenu
