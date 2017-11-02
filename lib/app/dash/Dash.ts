import * as names from '@package/self/common/names';
import { Attrs, Component } from '@quenk/wml-runtime';
import { Main } from './wml/dash';

/**
 * Dash are literal horizontal dashes.
 *
 * These can be used with app/menu/Button to create 'hamburger' menus.
 */
export class Dash extends Component<Attrs>{

    view = new Main(this);

    values = {
        class: {
            root: names.DASH
        }
    };

}