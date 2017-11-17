import * as wml from '@quenk/wml';
import { Delegate, Event } from '@package/self/control';
import { FormControlWWAttrs } from '@package/self/control/form-control';
import { Option } from '@package/self/control/select';
import { Date } from './Date';
export { Date };
export { DateChangedEvent } from './DateChangedEvent';
/**
 * DateAttrs
 */
export interface DateAttrs extends wml.Attrs {
    ww: DateWWAttrs;
}
/**
 * DateWWAttrs
 */
export interface DateWWAttrs extends FormControlWWAttrs<string> {
}
/**
 * DateValues available to the template context via @values.
 */
export interface DateValues {
    /**
     * root element values.
     */
    root: {
        id: string;
        class: string;
    };
    inline: {
        class: string;
    };
    /**
     * delegate that will receive events.
     */
    delegate: Delegate<string>;
    /**
     *date values
     */
    date: {
        months: Option[];
        prefix: (s: string | number, inc: boolean) => string;
    };
    /**
     * day input values.
     */
    day: InputValues;
    /**
     * month input values.
     */
    month: InputValues;
    /**
     * year input values.
     */
    year: InputValues;
    /**
     * name assigned to the date input.
     */
    name: string;
    /**
     * help things.
     */
    help: {
        id: string;
        success?: string;
        error?: string;
        warning?: string;
    };
    /**
     * label
     */
    label: {
        id: string;
        text: string;
    };
}
/**
 * InputValues are the values specific for each of the inputs
 * in the view.
 */
export interface InputValues {
    /**
     * id for accessing the input
     */
    id: string;
    /**
     * class assigned to the input
     */
    class: string;
    /**
     * value of the input (day,month or year).
     */
    value: string;
    /**
     * disabled indicates whether the input should be disabled or not.
     */
    disabled: boolean;
    /**
     * readOnly indicates whether the value should be readOnly.
     */
    readOnly: boolean;
    /**
     * onInput is called each time the user enters text
     * to the input.
     */
    onInput: (e: Event<string>) => void;
}
export declare const format: {
    YYYYDDMM: string;
    DD: string;
    MM: string;
    YYYY: string;
};
export declare const MONTHS: string[];
export declare const inputValues: (id: string, klass: string, value: string, date: Date, cb: (v: string) => void) => InputValues;
export declare const prefix: (s: string | number, inc?: boolean) => string;
