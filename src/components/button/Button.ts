import * as wml from '@quenk/wml-runtime';
import * as common from 'wml-widgets-common';
import { Main } from './wml/button';

export interface ButtonAttrs extends wml.Attrs {

    ww?: {
        id?: string,
        href?: string,
        variant?: string,
        size?: string,
        style?: string,
        class?: string,
        disabled?: boolean,
        onClick?: (e: Event) => void,
        text?: string
        type?: string,
        name?: string
    }

};

/**
 * Button is an improvement over HTMLButtionElement
 */
export class Button extends common.Container<ButtonAttrs> {

    view = new Main(this);

    /**
     * disable this button.
     */
    disable() {

        (<Element>this.view.findById('button')).setAttribute('disabled', 'disabled');
    }

    /**
     * enable this button.
     */
    enable() {

        (<Element>this.view.findById('button')).removeAttribute('disabled');

    }

    rendered() {

        if (this.attributes.read('wat:disabled'))
            (<HTMLButtonElement>this.view.findById('button')).setAttribute('disabled', 'disabled');

    }

}

export default Button
