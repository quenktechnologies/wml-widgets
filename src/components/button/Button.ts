import { AbstractWidget } from '@quenk/wml/lib/runtime';
import * as Styles from 'common/Styles';
import { Main } from './wml/button';

/**
 * Button is an improvement over HTMLButtionElement
 */
export class Button extends AbstractWidget {

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
