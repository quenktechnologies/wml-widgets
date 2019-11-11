import * as moment from 'moment';
import { View } from '@quenk/wml';
import { Maybe } from '@quenk/noni/lib/data/maybe';
import { Message } from '../feedback';
import { FormControlAttrs, AbstractFormControl } from '../form';
import { Event as ControlEvent } from '../';
export declare const DATE_FIELD = "ww-date-field";
export declare const DATE_FIELD_INPUT = "ww-date-field__input";
export declare const DEFAULT_INPUT_FORMAT: moment.MomentBuiltinFormat;
export declare const DEFAULT_INPUT_PLACEHOLDER = "YYYY-MM-DD";
export declare const DEFAULT_INPUT_DISPLAY = "YYYY-MM-DD";
export declare const VALUE_FORMAT = "YYYY-MM-DD";
export declare const DELAY = 200;
export declare const TODAY = "today";
export declare const NOW = "now";
export declare const YESTERDAY = "yesterday";
export declare const iso8601Formats: string[];
export declare const commonFormats: string[];
export declare const usFormats: string[];
/**
 * Format is used to determine what format input should be parsed as.
 */
export declare enum Format {
    ISO8601 = 1,
    COMMON = 2,
    USA = 3
}
/**
 * ISO8601Date type.
 */
export declare type ISO8601Date = string;
/**
 * DateFieldAttrs
 */
export interface DateFieldAttrs extends FormControlAttrs<ISO8601Date> {
    /**
     * placeholder
     */
    placeholder?: string;
    /**
     * block
     */
    block?: boolean;
    /**
     * format specifies what formats will be allowed for date input.
     */
    format?: Format;
    /**
     * display format used to display the value of the field when set.
     *
     * Must be one of moment's supported formats.
     */
    display?: string;
    /**
     * onChange handler.
     */
    onChange: (e: DateChangedEvent) => void;
}
/**
 * DateChangedEvent is generated when a valid date has been entered.
 *
 * The value is a truncated ISO8601 string consisting of the date part alone.
 */
export declare class DateChangedEvent extends ControlEvent<ISO8601Date | undefined> {
}
/**
 * DateField provides a text field for entering dates.
 *
 * It will only fire change events when the date input matches one
 * of the 3 format sets (ISO8601,Common,US).
 *
 * If the user removes focus and the entry is not valid, it will be ignored
 * and no change event will be fired. Once a valid date has been entered,
 * the value displayed can be formated using the format specified in the
 * "display" attribute. This does not affect the actual value provided
 * to onChange handlers.
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
            format: string[];
            placeholder: string;
            display: string;
            moment: Maybe<moment.Moment>;
            value: () => string;
            disabled: boolean | null;
            onfocus: (e: KeyboardEvent) => void;
            oninput: (e: KeyboardEvent) => void;
            onkeyup: (a: Event) => void;
            onblur: () => void;
        };
    };
    /**
     * @private
     */
    fireChange(): void;
    setMessage(msg: Message): DateField;
    removeMessage(): DateField;
}
