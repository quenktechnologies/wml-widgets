import { Component, Attrs } from '@quenk/wml-runtime';
import { noop } from 'wml-widgets-common/util';
import { InputView, SelectView } from './wml/input';
import * as Styles from 'wml-widgets-common/Styles';

const INPUT_SUCCESS = 'has-success';
const INPUT_ERROR = 'has-error';
const INPUT_WARNING = 'has-warning';

export type Opt = string | { label: string, value: string | number }

export interface InputAttrs extends Attrs {

    ww?: {
        id?: string,
        label?: string,
        message?: string,
        variant?: string
        title?: string,
        name?: string,
        value?: string | number,
        required?: boolean,
        type?: string,
        disabled?: boolean,
        readonly?: boolean,
        placeholder?: string,
        options?: Opt[],
        rows?: number,
        delegate?: InputDelegate,
        onInput?: (e: Event) => void
    }

}

/**
 * InputDelegate is an interface inputs can delegate all their events to.
 */
export interface InputDelegate {

    onInput(e: Event): void;

}

export class DefaultInputDelegate {

    constructor(public input: Input) { }

    onInput(e: Event) {

        (<Function>this.input.attributes.read('ww:onInput', noop))(e);

    }

}

/**
 * Input
 */
export class Input extends Component<InputAttrs> {

    view = new InputView(this);
    delegate: InputDelegate = this.attributes.read('ww:delegate', new DefaultInputDelegate(this));

    get name(): string {

        return (<Input>this.view.ids.input).name;

    }

    get value(): string {

        return (<Input>this.view.ids.input).value;

    }

    initialValue() {

        var ret = this.attributes.read('ww:value');

        return (typeof ret === 'function') ? ret(this.attributes.read('ww:name')) : ret;

    }

    /**
     * getClass
     */
    getClass() {

        var c = `form-group ${this.attributes.read('ww:class')}`;

        if (!this.attributes.read('ww:message'))
            return c;

        return `${c} ${this.attributes.read('ww:variant', 'has-error')}`;

    }

    /**
     * setMessage sets the message for the message portion of
     * this input.
     */
    setMessage(msg: string = ''): void {

        var message = <HTMLElement>this.view.ids.message;
        var node = document.createTextNode(msg);

        if (message.firstChild) {
            message.replaceChild(node, message.firstChild);
        } else {
            message.appendChild(node);
        }

    }

    /**
     * isFilled tells if this Input has a filled value.
     */
    isFilled(): boolean {

        return ((<Input>this.view.ids.input).value != null);

    }

    /**
     * isRequired tells if the Input was required.
     */
    isRequired(): boolean {

        return (this.attributes.read('ww:required') != null);

    }

    /**
     * isValid queries whether the Input has been invalidated
     * or not.
     */
    isValid(): boolean {

        return ((<HTMLElement>this.view.ids.root).className.split(' ').indexOf(INPUT_ERROR) === -1);

    }

    /**
     * removeValidationState removes the state validation state from the input.
     */
    removeValidationState() {

        var h = <HTMLElement>this.view.ids.root;
        h.classList.remove(INPUT_SUCCESS);
        h.classList.remove(INPUT_ERROR);
        h.classList.remove(INPUT_WARNING);

    }

    /**
     * invalidate this Input with an optional message.
     * @param {string} message
     * @returns {Input}
     */
    invalidate(message: string = ''): void {

        this.removeValidationState();
        this.setMessage(message);
        (<HTMLElement>this.view.ids.root).classList.add(INPUT_ERROR);

    }

    /**
     * validate this input with an optional messsage.
     * @param {string} message
     * @returns {Input}
     */
    validate(message = '') {

        this.removeValidationState();
        this.setMessage(message);
        (<HTMLElement>this.view.ids.root).classList.add(INPUT_SUCCESS);

    }

    /**
     * warn this input with an optional message.
     * @param {string} message
     * @returns {Input}
     */
    warn(message = '') {

        this.removeValidationState();
        this.setMessage(message);
        (<HTMLElement>this.view.ids.root).classList.add(INPUT_WARNING);

    }

    /**
     * reset this input to a clean state.
     * Removes messages, validation state etc.
     * @return {Input}
     */
    reset() {

        var root = this.view.ids.root;
        var m = <HTMLElement>this.view.ids.message;

        this.removeValidationState();

        while (m.firstChild)
            m.removeChild(m.firstChild);

    }

}

export class Select extends Input {

    view = new SelectView(this);

}
