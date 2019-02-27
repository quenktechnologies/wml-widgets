import { Fun, View } from '@quenk/wml';
import { FormControlAttrs, AbstractFormControl } from '../form';
import { Event } from '../';
export declare const TEXT_FIELD = "form-control";
/**
 * TextFieldTemplate describes the template used to render
 * the TextField.
 */
export declare type TextFieldTemplate = (f: TextField) => Fun;
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
     * controlTemplate is a template for rendering the control.
     */
    controlTemplate?: TextFieldTemplate;
    /**
     * onChange handler
     */
    onChange(e: TextChangedEvent): void;
}
/**
 * TextChangedEvent
 */
export declare class TextChangedEvent extends Event<string> {
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
            id: string;
            className: string;
        };
        messages: {
            wml: {
                id: string;
            };
        };
        label: {
            id: string;
            text: string;
        };
        control: {
            wml: {
                id: string;
            };
            template: () => TextFieldTemplate;
            name: string;
            type: string;
            focus: boolean | null;
            placeholder: string;
            value: string;
            disabled: boolean | null;
            readOnly: boolean | null;
            rows: number;
            oninput: (e: KeyboardEvent) => void;
        };
    };
}
