import { Attrs, Component } from '@quenk/wml-runtime';
import { Main } from './wml/dash';
/**
 * Dash are literal horizontal dashes.
 *
 * These can be used with app/menu/Button to create 'hamburger' menus.
 */
export declare class Dash extends Component<Attrs> {
    view: Main;
    values: {
        class: {
            root: string;
        };
    };
}
