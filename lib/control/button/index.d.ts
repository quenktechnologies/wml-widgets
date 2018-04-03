import * as wml from '@quenk/wml';
import { WidgetAttrs, StylableAttrs } from '../../';
import { Event } from '../';
export declare const BUTTON = "ww-button";
/**
 * ButtonAttrs
 */
export interface ButtonAttrs extends StylableAttrs {
    /**
     * size modifier for the button.
     */
    size?: string;
    /**
     * style assigns one of the supported styles.
     */
    style?: string;
    /**
     * class names that can be assigned to the button.
     */
    class?: string;
    /**
     * outline uses an alternative outline styling
     */
    outline?: boolean;
    /**
     * active indicates whether the button is active or not.
     */
    active?: boolean;
    /**
     * disabled indicates whether the button is disabled or not.
     */
    disabled?: boolean;
    /**
     * block scope this button.
     */
    block?: boolean;
    /**
     * onClick assigns a handler for click events.
     */
    onClick?: (e: ButtonClickedEvent) => void;
    /**
     * text can be specified as an alternative to explicit children.
     */
    text?: string;
    /**
     * type corresponds to the html attribute.
     */
    type?: string;
    /**
     * name of the button (used in event generation)
     */
    name?: string;
}
/**
 * ButtonClickedEvent
 */
export declare class ButtonClickedEvent extends Event<void> {
    name: string;
    constructor(name: string);
}
/**
 * Button is an improvement over HTMLButtionElement
 */
export declare class Button extends wml.Component<WidgetAttrs<ButtonAttrs>> {
    view: wml.View;
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
