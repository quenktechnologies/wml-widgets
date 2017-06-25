import { View, Widget } from '@quenk/wml/lib/runtime';
import drawer from './wml/drawer.wml';
import * as Class from 'wat-classes';

/**
 * Drawer
 */
class Drawer extends Widget {

    constructor(attrs, children) {

        super(attrs, children);
        this.view = new View(drawer, this);

    }

    /**
     * toggle the visibility of this Drawer
     */
    toggle() {

        this.view.findById('drawer').classList.toggle(Class.VISIBLE);

    }

    render() {

        return this.view.render();

    }

}

export default Drawer
