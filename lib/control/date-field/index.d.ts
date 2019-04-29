import * as moment from 'moment';
import { View } from '@quenk/wml';
import { FormControlAttrs, FormControl } from '../form';
import { FeedbackControlAttrs, AbstractFeedbackControl } from '../feedback';
import { Event as ControlEvent } from '../';
export declare const DATE_FIELD = "ww-date-field";
export declare const DATE_FIELD_CONTROLS = "ww-date-field__controls";
export declare const DATE_FIELD_DAY: string;
export declare const DATE_FIELD_MONTH: string;
export declare const DATE_FIELD_YEAR: string;
/**
 * DateFieldAttrs
 */
export interface DateFieldAttrs extends FormControlAttrs<string>, FeedbackControlAttrs<string> {
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
/**
 * DateField
 */
export declare class DateField extends AbstractFeedbackControl<string, DateFieldAttrs> implements FormControl<string, DateFieldAttrs> {
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
        controls: {
            className: string;
        };
        day: {
            wml: {
                id: string;
            };
            className: string;
            value: string;
            disabled: boolean | null;
            oninput: (e: KeyboardEvent) => void;
            onkeyup: (e: Event) => void;
        };
        month: {
            wml: {
                id: string;
            };
            className: string;
            value: string;
            disabled: boolean | null;
            oninput: (e: KeyboardEvent) => void;
            onkeyup: (e: Event) => void;
        };
        year: {
            wml: {
                id: string;
            };
            className: string;
            value: string;
            disabled: boolean | null;
            oninput: (e: KeyboardEvent) => void;
            onkeyup: (e: Event) => void;
        };
        name: string;
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
    };
    /**
     * @private
     */
    update(): void;
    /**
     * @private
     */
    fire(value: moment.Moment): void;
}
