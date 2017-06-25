import { View, Widget } from '@quenk/wml/lib/runtime';
import layout from './wml/layout.wml';

/**
 * Jumbotron
 */
class Jumbotron extends Widget {

    render() {

        return View.render(layout, this);

    }

}

export default Jumbotron
