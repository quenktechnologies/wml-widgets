import { View, Widget } from '@quenk/wml/lib/runtime';
import layout from './wml/row';

/**
 * Row
 */
class Row extends Widget {

    constructor(attrs, children) {

        super(attrs, children);

    }

    render() {

        return View.render(layout, this);

    }

}

export default Row
