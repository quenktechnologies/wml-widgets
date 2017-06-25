import { View, Widget } from '@quenk/wml/lib/runtime';
import layout from './wml/column.wml';

/**
 * Column
 */
class Column extends Widget {

    constructor(attrs, children) {

        super(attrs, children);

        this.className = attrs.read('wat:class', 'col-md-12');

    }

    render() {

        return View.render(layout, this);

    }

}

export default Column
