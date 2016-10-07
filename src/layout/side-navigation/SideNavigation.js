import { View, Widget } from 'wmljs/lib/runtime';
import side_navigation from './wml/side_navigation.wml';
import * as Class from 'wat-classes';

/**
 * SideNavigationItem
 */
class SideNavigation extends Widget {

    constructor(attrs, children) {

        super(attrs, children);

        this.view = new View(side_navigation, this);

    }

    handleEvent(e) {

        this.children.forEach(child => {

            if (child !== e.target)
                child.classList.remove(Class.ACTIVE);

        });

    }

    onRendered() {

        this.children.forEach(child => {

            child.addEventListener('click', this);

        });

    }

    render() {

        return this.view.render();

    }

}

export default SideNavigation
