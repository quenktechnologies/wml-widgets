import { View, Widget } from '@quenk/wml/lib/runtime';
import layout from './wml/header';

/**
 * Header
 */
class Header extends Widget {

    render() {

        return View.render(layout, this);

    }

}

export default Header
