import * as wml from '@quenk/wml-runtime';
import * as common from 'wml-widgets-common';
import * as views from './wml/button';

/**
 * GroupAttrs are the allowed attributes for <Group/>
 */
export interface GroupAttrs extends wml.Attrs {

    ww?: {
        class?: string,
    }

}

/**
 * Group multiple buttons into one element.
 */
export class Group extends common.Container<GroupAttrs> {

    view = new views.Group(this);

}

/**
 * ButtonAttrs are the allowed attributes for <Button/>
 */
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

    view = new views.Button(this);

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
