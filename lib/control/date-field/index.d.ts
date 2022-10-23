import { View } from '@quenk/wml';
import { Message } from '../feedback';
import { FormControlAttrs, AbstractFormControl } from '../form';
import { Event as ControlEvent } from '../';
export declare const DATE_FIELD = "ww-date-field";
export declare const DATE_FIELD_INPUT = "ww-date-field__input";
/**
 * ISO8601Date string.
 *
 * The only accepted format is YYYY-MM-DD.
 */
export declare type ISO8601Date = string;
/**
 * EmptyString indicating the date value was cleared.
 */
export declare type EmptyString = '';
/**
 * DateFieldAttrs
 */
export interface DateFieldAttrs extends FormControlAttrs<ISO8601Date> {
    /**
     * onChange handler.
     */
    onChange: (e: DateChangedEvent) => void;
}
/**
 * DateChangedEvent is generated when a valid date has been entered.
 *
 * The value is a truncated ISO8601 string consisting of the date part alone or
 * an empty string if the value has been removed.
 */
export declare class DateChangedEvent extends ControlEvent<ISO8601Date | EmptyString> {
}
/**
 * DateField provides a text field for entering dates in ISO8601 format .
 *
 * It will only fire change events when the value of the input is deemed to be
 * valid or has been cleared. If the user removes focus and the entry is not
 * valid, it will be ignored.
 */
export declare class DateField extends AbstractFormControl<ISO8601Date, DateFieldAttrs> {
    view: View;
    values: {
        root: {
            wml: {
                id: string;
            };
            id: string;
            className: string;
        };
        control: {
            wml: {
                id: string;
            };
            id: string;
        };
        label: {
            id: string;
            text: string;
        };
        messages: {
            wml: {
                id: string;
            };
            text: string;
        };
        input: {
            wml: {
                id: string;
            };
            className: string;
            name: string;
            placeholder: string;
            value: string;
            disabled: boolean | null;
            onfocus: (e: KeyboardEvent) => void;
            oninput: (e: KeyboardEvent) => void;
            onkeyup: (a: Event) => void;
            onblur: (a: unknown) => void;
        };
    };
    /**
     * @private
     */
    fireChange(): void;
    setMessage(msg: Message): DateField;
    removeMessage(): DateField;
}
