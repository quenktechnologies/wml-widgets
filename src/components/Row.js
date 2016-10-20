import { View, Widget } from 'wmljs/lib/runtime';
import layout from './wml/row.wml';

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
