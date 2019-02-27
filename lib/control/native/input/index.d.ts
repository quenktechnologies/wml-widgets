import { View } from '@quenk/wml';
import { ControlAttrs, Event, AbstractControl } from '../../';
export declare const NATIVE_INPUT = "ww-native-input";
/**
 * InputAttrs
 */
export interface InputAttrs extends ControlAttrs<string> {
    /**
     * placeholder sets placeholder text for the control.
     */
    placeholder?: string;
    /**
     * type of the text field.
     */
    type?: string;
    /**
     * readOnly indicates the Input is read only.
     */
    readOnly?: boolean;
    /**
     * onChange handler
     */
    onChange?: (e: TextChangedEvent) => void;
}
/**
 * TextChangedEvent
 */
export declare class TextChangedEvent extends Event<string> {
}
/**
 * Values available to the Input's views.
 */
export declare class Values {
    self: Input;
    wml: {
        id: string;
    };
    id: string;
    className: string;
    name: string;
    type: string;
    placeholder: string;
    value: string;
    disabled: boolean | null;
    readOnly: boolean | null;
    oninput: (e: KeyboardEvent) => void;
    constructor(self: Input, wml?: {
        id: string;
    }, id?: string, className?: string, name?: string, type?: string, placeholder?: string, value?: string, disabled?: boolean | null, readOnly?: boolean | null, oninput?: (e: KeyboardEvent) => void);
}
/**
 * Input provides a wrapped native text input control.
 */
export declare class Input extends AbstractControl<string, InputAttrs> {
    view: View;
    values: Values;
}
/**
 * dispatchInput when the user inputs some text.
 */
export declare const dispatchInput: (i: Input) => (e: KeyboardEvent) => void;
