import * as names from './classNames';
import { View, Attrs, Component } from '@quenk/wml';
import { Main } from './wml/dash';

/**
 * Dash are literal horizontal dashes.
 *
 * These can be used with app/menu/Button to create 'hamburger' menus.
 */
export class Dash extends Component<Attrs>{

    view: View = new Main(this);

    values = {

        class: {

            root: names.DASH

        }
    };

}
