import { View, Widget } from '@quenk/wml/lib/runtime';
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
