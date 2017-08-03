import { Component, Attrs } from '@quenk/wml-runtime';
import * as Styles from 'wml-widgets-common/Styles';
import { Main } from './wml/button';

export interface ButtonAttrs extends Attrs {

    ww?: {
        id?: string,
        href?: string,
        variant?: string,
        size?: string,
        style?: string,
        class?: string,
        onClick?: (e: Event) => void,
        text?: string
        type?: string,
        name?: string
    }

};

/**
 * Button is an improvement over HTMLButtionElement
 */
export class Button extends Component<ButtonAttrs> {

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
