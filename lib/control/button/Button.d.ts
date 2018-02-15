import * as wml from '@quenk/wml';
import { ButtonAttrs } from '.';
/**
 * Button is an improvement over HTMLButtionElement
 */
export declare class Button extends wml.Component<ButtonAttrs> {
    view: wml.View;
    /**
     * styles the Button supports.
     */
    styles: {
        [key: string]: string;
    };
    values: {
        button: {
            id: string;
            class: string;
            type: string;
            name: string;
            disabled: boolean;
            onclick: () => void;
            text: string;
        };
    };
    /**
     * disable this button.
     */
    disable(): void;
    /**
     * enable this button.
     */
    enable(): void;
    /**
     * toggle the disabled state of this button.
     */
    toggle(): void;
}
