import { View, Widget } from 'wmljs/lib/runtime';
import * as Class from 'wat-classes';
import drawer_link from './wml/drawer_link.wml';

/**
 * DrawerLink
 */
class DrawerLink extends Widget {

    constructor(attrs, children) {

        super(attrs, children);
        this.href = attrs.read('wat:href');
        this.view = new View(drawer_link, this);

    }

    /**
     * add the active state of this DrawerLink
     */
    activate() {

        var a = this.view.findById('a');
        var children = this.view.findById('a').parentNode.children;

        a.classList.remove(Class.ACTIVE);
        a.classList.add(Class.ACTIVE);

        for (var i = 0; i < children.length; i++)
            if (children[i].nodeName === 'A')
                if (children[i] !== a)
                    children[i].classList.remove(Class.ACTIVE);

    }

    /**
     * deactivate this DrawerLink
     */
    deactivate() {

        this.view.findById('a').classList.remove(Class.ACTIVE);

    }

    clicked() {

        this.activate();
        this.attributes.read('wat:onClick', function() {})(this);

    }

    render() {

        return this.view.render();

    }

}

export default DrawerLink
