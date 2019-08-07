import { View } from '@quenk/wml';
import { ControlAttrs, AbstractControl, Event } from '../';
export declare const CHECKBOX = "ww-checkbox";
/**
 * CheckboxAttrs
 */
export interface CheckboxAttrs extends ControlAttrs<boolean> {
    /**
     * disabled checkbox.
     */
    disabled?: boolean;
    /**
     * onChange handler.
     */
    onChange?: (e: CheckChangedEvent) => void;
}
/**
 * CheckChangedEvent signals the user has changed the checkbox state.
 */
export declare class CheckChangedEvent extends Event<boolean> {
}
/**
 * Checkbox control.
 *
 * This is an alternative to the native checkbox that can be styled.
 */
export declare class Checkbox extends AbstractControl<boolean, CheckboxAttrs> {
    view: View;
    values: {
        root: {
            id: string;
            className: string;
        };
        input: {
            name: string;
            value: true | null;
            onChange: () => void;
        };
    };
}
