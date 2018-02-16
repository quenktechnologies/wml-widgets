import * as wml from '@quenk/wml';
import { ClassNameMap } from '@package/wml-widgets/util/class-names';
import { ButtonAttrs } from '.';
/**
 * Button is an improvement over HTMLButtionElement
 */
export declare class Button extends wml.Component<ButtonAttrs> {
    view: wml.View;
    /**
     * NAME
     */
    static CLASSNAME: string;
    /**
     * styles the Button supports.
     */
    static styles: ClassNameMap;
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
