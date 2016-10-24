import { View, Widget } from 'wmljs/lib/runtime';
import layout from './wml/layout.wml';

const INPUT_SUCCESS = 'has-succes';
const INPUT_ERROR = 'has-error';
const INPUT_WARNING = 'has-warning';

/**
 * Input
 */
class Input extends Widget {

    constructor(attrs, children) {

        super(attrs, children);
        this.view = new View(layout, this);

    }

    /**
     * getClass
     */
    getClass() {

        var c = `form-group ${this.attributes.read('wat:class')}`;

        if (!this.attributes.read('wat:message'))
            return c;

        return `${c} has-error`;

    }

    input(e) {

        var set = this.attributes.read('wat:set', function() {});

        this.reset();
        set(e.target.name, e.target.value, this);

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
            message.replaceChild(message.firstChild, node  );
        }else{
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

        if (message)
            this.setMessage(message);

        this.view.findById('root').classList.remove(INPUT_ERROR);
        this.view.findById('root').classList.add(INPUT_ERROR);

    }

    /**
     * validate this input with an optional messsage.
     * @param {string} message
     * @returns {Input}
     */
    validate(message = '') {

        if (message)
            this.setMessage(message);

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

    render() {

        return this.view.render();

    }

}

export default Input
