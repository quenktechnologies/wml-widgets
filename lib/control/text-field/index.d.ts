import { Template, View } from '@quenk/wml';
import { FormControlAttrs, GenericFormControl } from '../form';
import { Event } from '../';
export declare const TEXT_FIELD = "form-control";
/**
 * TextFieldTemplate describes the template used to render
 * the TextField.
 */
export declare type TextFieldTemplate = (f: TextField) => Template;
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
export declare class TextField extends GenericFormControl<string, TextFieldAttrs> {
    view: View;
    get: () => string;
    set: (v: string) => this;
    values: {
        root: {
            id: string;
            class: string;
        };
        help: {
            id: string;
            success: string;
            error: string;
            warning: string;
        };
        label: {
            id: string;
            text: string;
        };
        control: {
            id: string;
            template: () => TextFieldTemplate;
            class: string;
            name: string;
            type: string;
            focus: boolean;
            placeholder: string;
            value: string;
            disabled: boolean;
            readOnly: boolean;
            rows: number;
            oninput: (e: KeyboardEvent) => void;
        };
    };
}
