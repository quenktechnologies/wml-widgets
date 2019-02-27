import * as moment from 'moment';
import { View } from '@quenk/wml';
import { FormControlAttrs, FormControl } from '../form';
import { FeedbackControlAttrs, AbstractFeedbackControl } from '../feedback';
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
export declare class Date extends AbstractFeedbackControl<string, DateAttrs> implements FormControl<string, DateAttrs> {
    view: View;
    get: () => string;
    set: (_: string) => this;
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
        };
        inline: {
            className: string;
        };
        date: {
            months: {
                label: string;
                value: string;
            }[];
            value: moment.Moment | null;
            sep: string;
            format: string;
            fire: () => void;
        };
        month: {
            wml: {
                id: string;
            };
            className: string;
            value: () => string;
            disabled: boolean | null;
            onchange: (e: Event) => void;
        };
        day: {
            wml: {
                id: string;
            };
            className: string;
            value: () => string;
            disabled: boolean | null;
            oninput: (e: KeyboardEvent) => void;
            onkeyup: (e: Event) => void;
        };
        year: {
            wml: {
                id: string;
            };
            className: string;
            value: () => string;
            disabled: boolean | null;
            oninput: (e: KeyboardEvent) => void;
            onkeyup: (e: Event) => void;
        };
        name: string;
        messages: {
            wml: {
                id: string;
            };
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
