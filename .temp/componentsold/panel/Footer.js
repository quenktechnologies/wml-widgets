import { View, Widget } from '@quenk/wml/lib/runtime';
import layout from './wml/footer';

/**
 * Footer
 */
class Footer extends Widget {

    render() {

        return View.render(layout, this);

    }

}

export default Footer
