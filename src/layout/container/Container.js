import { View, Widget } from 'wmljs/lib/runtime';
import container from './wml/container.wml';

/**
 * Container provides the widget that wraps all the content together (Drawer and content area).
 */
class Container extends Widget {

    render() {

        return View.render(container, this);

    }

}

export default Container
