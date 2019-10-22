import { View } from '@quenk/wml';
import { Size } from '../../content/size';
import { FocusableAttrs, Focusable } from '../focus';
import { ControlAttrs, AbstractControl, Event } from '../';
export declare const TEXT_INPUT = "ww-text-input";
/**
 * TextInputAttrs
 */
export interface TextInputAttrs extends ControlAttrs<string>, FocusableAttrs {
    /**
     * placeholder sets placeholder text for the control.
     */
    placeholder?: string;
    /**
     * type of the text field.
     */
    type?: string;
    /**
     * min amount if the type is number.
     */
    min?: number;
    /**
     * max amount if the type is number.
     */
    max?: number;
    /**
     * match if specified restricts input to characters matching the
     * specified pattern.
     */
    match?: string;
    /**
     * length indicates the max number of characters allowed to be input.
     */
    length?: number;
    /**
     * size of the TextInput
     */
    size?: Size;
    /**
     * block orientation flag.
     */
    block?: boolean;
    /**
     * rows
     *
     * Setting this to anything more than 1 will result in a <textarea>
     */
    rows?: number;
    /**
     * readOnly indicates the TextInput is read only.
     */
    readOnly?: boolean;
    /**
     * dsiabled indicates whether the control can be manipulated or not.
     */
    disabled?: boolean;
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
 * TextInput provides some extra styling to the native input.
 */
export declare class TextInput extends AbstractControl<string, TextInputAttrs> implements Focusable {
    view: View;
    values: {
        control: {
            wml: {
                id: string;
            };
        };
        id: string;
        className: string;
        name: string;
        type: string;
        min: string | null;
        max: string | null;
        match: RegExp;
        length: number;
        placeholder: string;
        value: string;
        rows: number;
        disabled: boolean | null;
        readOnly: boolean | null;
        onkeydown: (e: KeyboardEvent) => void;
        oninput: (e: KeyboardEvent) => void;
        autofocus: boolean | undefined;
        onfocus: () => void;
        onblur: () => void;
    };
    focus(): void;
}
