import { View, Widget } from '@quenk/wml/lib/runtime';
import layout from './body.wml';

/**
 * Body
 */
class Body extends Widget {

    render() {

        return View.render(layout, this);

    }

}

export default Body
