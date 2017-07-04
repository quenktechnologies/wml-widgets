import { AbstractWidget } from '@quenk/wml/lib/runtime';
import { Main } from './wml/button';
/**
 * Button is an improvement over HTMLButtionElement
 */
export declare class Button extends AbstractWidget {
    view: Main;
    /**
     * disable this button.
     */
    disable(): void;
    /**
     * enable this button.
     */
    enable(): void;
    rendered(): void;
}
export default Button;
