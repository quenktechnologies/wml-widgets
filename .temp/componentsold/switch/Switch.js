import { View, Widget } from '@quenk/wml/lib/runtime';
import layout from './wml/layout.wml';

/**
 * Switch
 */
class Switch extends Widget {

    constructor(attrs, children) {

        super(attrs, children);

        this.view = new View(layout, this);

    }

    changed(e) {

        console.log(e);

    }

    calculateValue() {

        var onValue = this.attributes.read('wat:onValue');

        if((onValue === undefined) || (onValue === null))
           return this.attributes.read('wat:value');

        if(this.attributes.read('wat:value') === onValue)
            return true;

    }

    render() {

        return this.view.render();

    }

}

export default Switch
