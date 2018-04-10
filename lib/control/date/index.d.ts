import * as moment from 'moment';
import { View } from '@quenk/wml';
import { FormControlAttrs, FormControl } from '../form';
import { FeedbackControlAttrs, GenericFeedbackControl } from '../feedback';
import { Event as ControlEvent } from '../';
/**
 * DATE class name.
 */
export declare const DATE = "ww-date";
/**
 * DATE_DAY class name.
 */
export declare const DATE_DAY: string;
/**
 * DATE_MONTH class name.
 */
export declare const DATE_MONTH: string;
/**
 * DATE_YEAR class name.
 */
export declare const DATE_YEAR: string;
/**
 * DateAttrs
 */
export interface DateAttrs extends FormControlAttrs<string>, FeedbackControlAttrs<string> {
    /**
     * onChange handler.
     */
    onChange: (e: DateChangedEvent) => void;
}
/**
 * DateChangedEvent is generated when the date has
 * been changed to a valid date.
 */
export declare class DateChangedEvent extends ControlEvent<string> {
}
export declare const format: {
    YYYYDDMM: string;
    DD: string;
    MM: string;
    YYYY: string;
};
export declare const MONTHS: string[];
/**
 * Date input.
 */
export declare class Date extends GenericFeedbackControl<string, DateAttrs> implements FormControl<string, DateAttrs> {
    view: View;
    get: () => string;
    set: (_: string) => this;
    values: {
        root: {
            id: string;
            class: string;
        };
        inline: {
            class: string;
        };
        date: {
            months: {
                label: string;
                value: string;
            }[];
            value: moment.Moment;
            sep: string;
            format: string;
            fire: () => void;
        };
        month: {
            id: string;
            class: string;
            value: () => string;
            disabled: boolean;
            onchange: (e: Event) => void;
        };
        day: {
            id: string;
            class: string;
            value: () => string;
            disabled: boolean;
            oninput: (e: KeyboardEvent) => void;
            onkeyup: (e: Event) => void;
        };
        year: {
            id: string;
            class: string;
            value: () => string;
            disabled: boolean;
            oninput: (e: KeyboardEvent) => void;
            onkeyup: (e: Event) => void;
        };
        name: string;
        messages: {
            id: string;
            success: string;
            error: string;
            warning: string;
        };
        label: {
            id: string;
            text: string;
        };
    };
    /**
     * calculate the date based on the current value of the inputs.
     */
    calculate(): moment.Moment;
}
