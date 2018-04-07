import { View } from '@quenk/wml';
import { ControlAttrs, GenericControl, Event } from '../../control';
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
export declare class Switch extends GenericControl<boolean, SwitchAttrs> {
    view: View;
    values: {
        class: {
            label: string;
            slider: string;
        };
        input: {
            name: string;
            value: boolean;
            disabled: boolean;
            onChange: () => void;
        };
    };
}
