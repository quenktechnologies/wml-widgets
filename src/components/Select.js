import View from 'wml/lib/runtime/View';
import vertical from './wml/vertical_input.wml';
import textarea from './wml/vertical_textarea.wml';

/**
 * Input
 */
class Input {

    constructor(attrs) {

        this.id = attrs.html.id || '';
        this.name = attrs.html.name || '';
        this.type = attrs.html.type || 'text';
        this.class = attrs.html.class || '';
        this.value = attrs.html.value || '';

        if (attrs.ns.bs) {
            this.has = attrs.ns.bs.has || '';
            this.message = attrs.ns.bs.message || '';
            this.label = attrs.ns.bs.label || '';
            this.set = attrs.ns.bs.set || '';
        }

        this.view = new View(this.getLayout(), this);

    }

    getLayout() {

        return vertical;

    }

    /**
     * getClass 
     */
    getClass() {

        var c = `form-group ${this.class}`;

        if (!this.message)
            return c;

        return `${c} has-error`;

    }

    input(e) {

        var span = this.view.findById('span');

        if (this.set)
            this.set(e.target.name, e.target.value);

        span.innerHTML = '';

    }

    render() {

        return this.view.render();

    }

}

/**
 * Textarea
 */
class Textarea extends Input {

    getLayout() {

        return textarea;

    }

}

Input.Text = Textarea
export default Input
