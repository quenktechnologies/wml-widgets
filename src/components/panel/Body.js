import { View, Widget } from 'wmljs/lib/runtime';
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
