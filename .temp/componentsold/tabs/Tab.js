import { View, Widget } from '@quenk/wml/lib/runtime';
import layout from './tab.wml';

/**
 * Tab
 */
class Tab extends Widget {

    constructor() {

        super(...arguments);

        this.view = new View(layout, this);

    }

    /**
     * click this Tab
     */
    click() {

        this.view.findById('link').click();

    }

    clicked(e) {

        e.preventDefault();

        var parent = this.view.root.parentNode;
        var us = parent.children;

        for(var i=0; i<us.length; i++)
            us[i].classList.remove('active');

        this.view.root.classList.add('active');
        this.attributes.read('wat:onClick', function() {})(this.attributes.read('wat:name'));

    }

    render() {

        return this.view.render();

    }

}

export default Tab
