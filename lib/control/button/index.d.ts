import { View } from '@quenk/wml';
import { Style } from '../../content/style';
import { Size } from '../../content/size';
import { ControlAttrs, AbstractControl, Event } from '../';
export { Style };
export declare const BUTTON = "ww-button";
/**
 * ButtonAttrs
 */
export interface ButtonAttrs<V> extends ControlAttrs<V> {
    /**
     * size modifier for the button.
     */
    size?: Size;
    /**
     * style assigns one of the supported styles.
     */
    style?: Style;
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
export declare class Button<V> extends AbstractControl<V, ButtonAttrs<V>> {
    view: View;
    values: {
        button: {
            wml: {
                id: string;
            };
            id: string;
            className: string;
            type: string;
            name: string;
            disabled: boolean | null;
            onclick: () => void | undefined;
            content: () => import("@quenk/wml").Content[];
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
