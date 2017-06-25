import { View, Widget } from '@quenk/wml/lib/runtime';
import container from './wml/container.wml';

/**
 * LayoutContainer provides the widget that wraps all the content together (Drawer and content area).
 */
class LayoutContainer extends Widget {

    render() {

        return View.render(container, this);

    }

}

export default LayoutContainer
