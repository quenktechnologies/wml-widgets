import { View, Widget } from 'wmljs/lib/runtime';
import button from './wml/button.wml';

/**
 * Button a bootstrap styled button.
 */
class Button extends Widget {

    constructor(attrs, children) {

        super(attrs, children);

        this.view = new View(button, this);

    }

    getClass() {

        var variant = this.attributes.read('wat:variant', 'default');
        var cls = this.attributes.read('wat:class', '');
        return `btn btn-${variant} ${cls}`.trim();

    }

    clicked(e) {

        this.attributes.read('wat:onClick', function() {})(e.target.name, this, e);

    }

    /**
     * disable this button.
     */
    disable() {

        this.view.findById('button').setAttribute('disabled', 'disabled');

    }

    /**
     * enable this button.
     */
    enable() {

        this.view.findById('button').removeAttribute('disabled');

    }

    onRendered() {

        if (this.attributes.read('wat:disabled'))
            this.view.findById('button').setAttribute('disabled', 'disabled');

    }

    render() {

        return this.view.render();

    }

}

export default Button
