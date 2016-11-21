import { View, Widget } from 'wmljs/lib/runtime';
import layout from './panel.wml';

/**
 * Panel
 */
class Panel extends Widget {

    render() {

        return View.render(layout, this);

    }

}

export default Panel
