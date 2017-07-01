import { View, Widget } from '@quenk/wml/lib/runtime';
import layout from './wml/panel';

/**
 * Panel
 */
class Panel extends Widget {

    render() {

        return View.render(layout, this);

    }

}

export default Panel
