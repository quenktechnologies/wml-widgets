import { View, Attrs, Component } from '@quenk/wml';
import { Main } from './wml/dash';

///classNames:begin
/**
 * DASH
 */
export const DASH = 'ww-dash';
///classNames:end

/**
 * Dash are literal horizontal dashes.
 *
 * These can be used with app/menu/Button to create 'hamburger' menus.
 */
export class Dash extends Component<Attrs>{

    view: View = new Main(this);

    values = {

        class: {

            root: DASH

        }
    };

}
