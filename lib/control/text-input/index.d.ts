import { View } from '@quenk/wml';
import { Size } from '../../content/size';
import { FeedbackControlAttrs, AbstractFeedbackControl } from '../feedback';
import { FocusableAttrs, Focusable } from '../focus';
import { Event } from '../';
export declare const TEXT_INPUT = "ww-text-input";
/**
 * TextInputAttrs
 */
export interface TextInputAttrs extends FeedbackControlAttrs<string>, FocusableAttrs {
    /**
     * placeholder sets placeholder text for the control.
     */
    placeholder?: string;
    /**
     * type of the text field.
     */
    type?: string;
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
export declare class TextInput extends AbstractFeedbackControl<string, TextInputAttrs> implements Focusable {
    view: View;
    values: {
        control: {
            wml: {
                id: string;
            };
        };
        messages: {
            wml: {
                id: string;
            };
        };
        id: string;
        className: string;
        name: string;
        type: string;
        placeholder: string;
        value: string;
        rows: number;
        disabled: boolean | null;
        readOnly: boolean | null;
        oninput: (e: KeyboardEvent) => void;
        focus: boolean | undefined;
        onfocus: () => void;
        onblur: () => void;
    };
    focus(): void;
}