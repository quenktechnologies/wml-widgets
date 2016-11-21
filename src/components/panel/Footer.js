import { View, Widget } from 'wmljs/lib/runtime';
import layout from './footer.wml';

/**
 * Footer
 */
class Footer extends Widget {

    render() {

        return View.render(layout, this);

    }

}

export default Footer
