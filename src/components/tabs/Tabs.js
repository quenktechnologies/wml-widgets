import { View, Widget } from 'wmljs/lib/runtime';
import layout from './tabs.wml';

/**
 * Tabs
 */
class Tabs extends Widget {

    render() {

        return View.render(layout, this);

    }

}

export default Tabs
