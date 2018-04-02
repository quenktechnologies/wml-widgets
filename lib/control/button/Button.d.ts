import * as wml from '@quenk/wml';
import { ClassMap } from '../../util/classNames';
import { ButtonAttrs } from '.';
/**
 * Button is an improvement over HTMLButtionElement
 */
export declare class Button extends wml.Component<ButtonAttrs> {
    view: wml.View;
    /**
     * NAME
     */
    static CLASS_NAME: string;
    /**
     * styles the Button supports.
     */
    static styles: ClassMap;
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
