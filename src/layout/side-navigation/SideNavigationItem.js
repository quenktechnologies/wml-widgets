import { View, Widget } from 'wmljs/lib/runtime';
import * as Class from 'wat-classes';
import side_navigation_item from './wml/side_navigation_item.wml';

/**
 * SideNavigationItem
 */
class SideNavigationItem extends Widget {

    constructor(attrs, children) {

        super(attrs, children);
        this.view = new View(side_navigation_item, this);

    }

    /**
     * add the active state of this SideNavigationItem
     */
    active() {

        this.view.findById('a').classList.remove(Class.ACTIVE);
        this.view.findById('a').classList.add(Class.ACTIVE);

    }

    clicked() {

        this.attributes.read('wat:onClick', function() {})(this);

    }

    render() {

        return this.view.render();

    }

}

export default SideNavigationItem
