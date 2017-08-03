import { Component, Attrs } from '@quenk/wml-runtime';
import { Main } from './wml/button';
export interface ButtonAttrs extends Attrs {
    ww?: {
        id?: string;
        href?: string;
        variant?: string;
        size?: string;
        style?: string;
        class?: string;
        onClick?: (e: Event) => void;
        text?: string;
        type?: string;
        name?: string;
    };
}
/**
 * Button is an improvement over HTMLButtionElement
 */
export declare class Button extends Component<ButtonAttrs> {
    view: Main<this>;
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
