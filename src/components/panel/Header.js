import { View, Widget } from '@quenk/wml/lib/runtime';
import layout from './header.wml';

/**
 * Header
 */
class Header extends Widget {

    render() {

        return View.render(layout, this);

    }

}

export default Header
