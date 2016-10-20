import { View, Widget } from 'wmljs/lib/runtime';
import layout from './wml/container.wml';

/**
 * Container
 */
class Container extends Widget {

    constructor(attrs, children) {

        super(attrs, children);

        this.className = ('container-fluid '+attrs.read('wat:class', '')).trim();

    }

    render() {

        return View.render(layout, this);

    }

}

export default Container
