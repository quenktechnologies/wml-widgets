import { View } from '@quenk/wml';
import { ControlAttrs, AbstractControl, Event } from '../';
export declare const SWITCH = "ww-switch";
export declare const SWITCH_SLIDER = "ww-switch__slider";
/**
 * SwitchAttrs
 */
export interface SwitchAttrs extends ControlAttrs<boolean> {
    /**
     * onChange handler
     */
    onChange?: (e: SwitchChangedEvent) => void;
}
/**
 * SwitchChangedEvent signals the user has changed the switch.
 */
export declare class SwitchChangedEvent extends Event<boolean> {
}
/**
 * Switch allows the user to select between one or two values.
 */
export declare class Switch extends AbstractControl<boolean, SwitchAttrs> {
    view: View;
    values: {
        root: {
            id: string;
            className: string;
        };
        slider: {
            className: string;
        };
        input: {
            name: string;
            value: boolean;
            checked: () => true | undefined;
            disabled: boolean;
            onChange: () => void;
        };
    };
}
