import { View, Widget } from 'wmljs/lib/runtime';
import layout from './wml/layout.wml';

/**
 * Well
 */
class Well extends Widget {

    render() {

        return View.render(layout, this);

    }

}

export default Well
