import { View } from '@quenk/wml';
import { ControlAttrs, GenericControl, Event } from '../';
export declare const BUTTON = "ww-button";
/**
 * ButtonAttrs
 */
export interface ButtonAttrs<V> extends ControlAttrs<V> {
    /**
     * size modifier for the button.
     */
    size?: string;
    /**
     * style assigns one of the supported styles.
     */
    style?: string;
    /**
     * outline uses an alternative outline styling
     */
    outline?: boolean;
    /**
     * active indicates whether the button is active or not.
     */
    active?: boolean;
    /**
     * block scope this button.
     */
    block?: boolean;
    /**
     * onClick assigns a handler for click events.
     */
    onClick?: (e: ButtonClickedEvent<V>) => void;
    /**
     * text can be specified as an alternative to explicit children.
     */
    text?: string;
    /**
     * type corresponds to the html attribute.
     */
    type?: string;
}
/**
 * ButtonClickedEvent
 */
export declare class ButtonClickedEvent<V> extends Event<V> {
}
/**
 * Button is an improvement over HTMLButtionElement
 */
export declare class Button<V> extends GenericControl<V, ButtonAttrs<V>> {
    view: View;
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
