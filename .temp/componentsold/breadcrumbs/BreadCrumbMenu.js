import { View, Widget } from '@quenk/wml/lib/runtime';
import BreadCrumb from './BreadCrumb';
import menu from './wml/menu.wml';

/**
 * BreadCrumbMenu
 */
class BreadCrumbMenu extends Widget {

    constructor(attrs, children) {

        super(attrs, children);

        this.view = new View(menu, this);

    }

    render() {

        return this.view.render();

    }
}

export default BreadCrumbMenu
