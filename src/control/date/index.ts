import * as wml from '@quenk/wml';
import { Delegate, Event } from '../../control';
import { FormControlWWAttrs } from '../../control/form-control';
import { Option } from '../../control/select';
import { Date } from './Date';

export { Date };
export { DateChangedEvent } from './DateChangedEvent';

/**
 * DateAttrs
 */
export interface DateAttrs extends wml.Attrs {

    ww: DateWWAttrs

}

/**
 * DateWWAttrs
 */
export interface DateWWAttrs extends FormControlWWAttrs<string> { }

/**
 * DateValues available to the template context via @values.
 */
export interface DateValues {

    /**
     * root element values.
     */
    root: {

        id: string,
        class: string

    },

    inline: {

        class: string

    },

    /**
     * delegate that will receive events.
     */
    delegate: Delegate<string>,

    /**
     *date values
     */
    date: {

        months: Option[],
        prefix: (s: string | number, inc: boolean) => string

    },

    /**
     * day input values.
     */
    day: InputValues,

    /**
     * month input values.
     */
    month: InputValues,

    /**
     * year input values.
     */
    year: InputValues,

    /**
     * name assigned to the date input.
     */
    name: string

    /**
     * help things.
     */
    help: {

        id: string,
        success?: string,
        error?: string,
        warning?: string

    },

    /**
     * label 
     */
    label: {

        id: string,
        text: string

    }

};

/**
 * InputValues are the values specific for each of the inputs
 * in the view.
 */
export interface InputValues {

    /**
     * id for accessing the input
     */
    id: string,

    /**
     * class assigned to the input
     */
    class: string,

    /**
     * value of the input (day,month or year).
     */
    value: string,

    /**
     * disabled indicates whether the input should be disabled or not.
     */
    disabled: boolean,

    /**
     * readOnly indicates whether the value should be readOnly.
     */
    readOnly: boolean,

    /**
     * onInput is called each time the user enters text
     * to the input.
     */
    onInput: (e: Event<string>) => void

}

export const format = {

    YYYYDDMM: 'YYYY-MM-DD',
    DD: 'DD',
    MM: 'MM',
    YYYY: 'YYYY'
}

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const inputValues =
  (id: string,
    klass: string,
    value: string, 
    date: Date, cb: (v: string) => void): InputValues => ({

    id,
    class: klass,
    value,
    disabled: (date.attrs.ww.disabled === true) ? true : null,
    readOnly: (date.attrs.ww.readOnly === true) ? true : null,
    onInput: ({ value }: Event<string>): void => {

        cb(value);
        date.date.value = date.calculate();
        date.fireChange();

    }
});

export const prefix = (s: string | number, inc = false): string => {

    let n = Number(s);

    if (inc)
        n = n + 1;

    if (isNaN(n)) return '';

    return (n < 10) ? `0${n}` : `${n}`;

}

