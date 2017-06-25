import { View, Widget } from '@quenk/wml/lib/runtime';
import layout from './wml/layout.wml';

const INPUT_SUCCESS = 'has-success';
const INPUT_ERROR = 'has-error';
const INPUT_WARNING = 'has-warning';
const noop = function() {};

/**
 * InputDelegate is an interface inputs can delegate all their events to.
 * Currently only supports the 'oninput' event handler.
 */
export class InputDelegate {

    /**
     * onInput is called when the underlying control fires an input event.
     * @param {Event} e
     * @param {Input} input
     */
    onInput() {

    }

}

/**
 * @private
 */
export class Adapter {

    constructor(delegate, input) {

        this._delegate = delegate;
        this._input = input;

    }

    onInput(e) {

        this._delegate.onInput(e, this._input);

    }

}

class DefaultInputDelegate {

    onInput(e) {

        this.attributes.read('wat:onInput', noop)(e);

    }

}

/**
 * Input
 */
class Input extends Widget {

    constructor(attrs, children) {

        super(attrs, children);

        this.view = new View(layout, this);

        this.delegate = new Adapter(
            attrs.read('wat:delegate',
                new DefaultInputDelegate(attrs)), this);

    }

    get value() {

        return this.view.findById('input').value;

    }

    watValue() {

        var ret = this.attributes.read('wat:value');

        return (typeof ret === 'function') ? ret(this.attributes.read('wat:name')) : ret;

    }

    /**
     * getClass
     */
    getClass() {

        var c = `form-group ${this.attributes.read('wat:class')}`;

        if (!this.attributes.read('wat:message'))
            return c;

        return `${c} ${this.attributes.read('wat:variant', 'has-error')}`;

    }

    /**
     * setMessage sets the message for the message portion of
     * this input.
     * @param {string} msg
     */
    setMessage(msg = '') {

        var message = this.view.findById('message');
        var node = document.createTextNode(msg);

        if (message.firstChild) {
            message.replaceChild(node, message.firstChild);
        } else {
            message.appendChild(node);
        }

    }

    /**
     * isFilled tells if this Input has a filled value.
     * @returns {boolean}
     */
    isFilled() {

        return this.view.findById('input').value;

    }

    /**
     * isRequired tells if the Input was required.
     * @returns {boolean}
     */
    isRequired() {

        if (this.attributes.read('wat:required'))
            return true;

    }

    /**
     * isValid queries whether the Input has been invalidated
     * or not.
     * @returns {boolean}
     */
    isValid() {

        return (this.view.findById('root').className.split(' ').indexOf(INPUT_ERROR) === -1);

    }

    /**
     * invalidate this Input with an optional message.
     * @param {string} message
     * @returns {Input}
     */
    invalidate(message = '') {

        this.setMessage(message);
        this.view.findById('root').classList.remove(INPUT_SUCCESS);
        this.view.findById('root').classList.remove(INPUT_ERROR);
        this.view.findById('root').classList.add(INPUT_ERROR);

    }

    /**
     * validate this input with an optional messsage.
     * @param {string} message
     * @returns {Input}
     */
    validate(message = '') {

        this.setMessage(message);
        this.view.findById('root').classList.remove(INPUT_ERROR);
        this.view.findById('root').classList.remove(INPUT_SUCCESS);
        this.view.findById('root').classList.add(INPUT_SUCCESS);

    }

    /**
     * warn this input with an optional message.
     * @param {string} message
     * @returns {Input}
     */
    warn(message = '') {

        if (message)
            this.setMessage(message);

        this.view.findById('root').classList.remove(INPUT_WARNING);
        this.view.findById('root').classList.add(INPUT_WARNING);

    }

    /**
     * reset this input to a clean state.
     * Removes messages, validation state etc.
     * @return {Input}
     */
    reset() {

        var root = this.view.findById('root');

        root.classList.remove(INPUT_SUCCESS);
        root.classList.remove(INPUT_ERROR);
        root.classList.remove(INPUT_WARNING);

        this.view.findById('message').innerHTML = '';

    }

    /**
     * getName returns the name of this Input
     * @returns {string}
     */
    getName() {

        return this.attributes.read('wat:name');

    }

    render() {

        return this.view.render();

    }

}

export { DefaultInputDelegate }
export default Input
