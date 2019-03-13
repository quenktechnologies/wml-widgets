import { View } from '@quenk/wml';
import { ValidationState, Message } from '../feedback';
import { FormControlAttrs, AbstractFormControl } from '../form';
import { TextChangedEvent } from '../text-input';
export { TextChangedEvent };
export declare const TEXT_FIELD = "ww-text-field";
/**
 * TextFieldAttrs
 */
export interface TextFieldAttrs extends FormControlAttrs<string> {
    /**
     * placeholder sets placeholder text for the control.
     */
    placeholder?: string;
    /**
     * type of the text field.
     */
    type?: string;
    /**
     * rows more than 1 will use a textarea instead of an input.
     */
    rows?: number;
    /**
     * readOnly indicates the TextField is read only.
     */
    readOnly?: boolean;
    /**
     * focus indicates this input should steal focus when rendered.
     */
    focus?: boolean;
    /**
     * onChange handler
     */
    onChange?(e: TextChangedEvent): void;
}
/**
 * TextField provides a wrapped native text input control.
 */
export declare class TextField extends AbstractFormControl<string, TextFieldAttrs> {
    view: View;
    get: () => string;
    set: (v: string) => this;
    values: {
        root: {
            wml: {
                id: string;
            };
            className: string;
        };
        messages: {
            wml: {
                id: string;
            };
            text: string;
        };
        label: {
            id: string;
            text: string;
        };
        control: {
            wml: {
                id: string;
            };
            id: string;
            name: string;
            type: string;
            focus: boolean | undefined;
            placeholder: string;
            value: string;
            disabled: boolean | undefined;
            readOnly: boolean | undefined;
            rows: number;
            validationState: ValidationState;
            oninput: (e: KeyboardEvent) => void;
            onChange: (e: TextChangedEvent) => void;
        };
    };
    setMessage(msg: Message): TextField;
    removeMessage(): TextField;
    setValidationState(state: ValidationState): TextField;
    removeValidationState(): TextField;
    getValidationState(): ValidationState;
}
