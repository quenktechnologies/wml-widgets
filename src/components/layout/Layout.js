import { View, Widget } from '@quenk/wml/lib/runtime';
import view from './wml/view';

/**
 * LayoutContainer provides the widget that wraps all the content together (Drawer and content area).
 */
class LayoutContainer extends Widget {

    render() {

        return View.render(view, this);

    }

}

export default LayoutContainer
