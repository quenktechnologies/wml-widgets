import * as views from './wml/date';
import * as wml from '@quenk/wml';
import * as names from '@package/self/common/names';
import * as moment from 'moment';
import { concat } from '@package/self/common/util';
import { FormControl, Delegate, DefaultDelegate, Event } from '@package/self/control';
import { Option } from '@package/self/control/select';
import { DateAttrs } from './DateAttrs';
import { DateChangedEvent } from './DateChangedEvent';

export const format = {

    YYYYDDMM: 'YYYY-MM-DD',
    DD: 'DD',
    MM: 'MM',
    YYYY: 'YYYY'
}

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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

const _inputValues = (id: string, klass: string, value: string, date: Date, cb: (v: string) => void): InputValues => ({

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

const _prefix = (s: string | number, inc = false): string => {

    let n = Number(s);

    if (inc)
        n = n + 1;

    if (isNaN(n)) return '';

    return (n < 10) ? `0${n}` : `${n}`;

}

/**
 * Date input.
 */
export class Date extends FormControl<string, DateAttrs> {

    view: wml.View = new views.Main(this);

    delegate: Delegate<string> = this.attrs.ww.delegate ?
        this.attrs.ww.delegate : new DefaultDelegate(this.attrs.ww);

    date = {
        value: this.attrs.ww.value ? moment(this.attrs.ww.value, format.YYYYDDMM) : null,
        sep: '-',
        format: format.YYYYDDMM
    };

    values: DateValues = {

        root: {

            id: 'root',
            class: concat(names.DATE, 'form-inline', this.attrs.ww.class, this.state()),

        },
        date: {

            months: MONTHS.map((label, value) => ({ label, value: _prefix(value + 1) })),
            prefix: _prefix

        },
        delegate: this.delegate,
        day: _inputValues('day', names.DATE_DAY, (this.date.value && this.date.value.isValid()) ?
            this.date.value.format(format.DD) : '', this,
            v => this.values.day.value = _prefix(v)),

        month: _inputValues('month', names.DATE_MONTH, (this.date.value && this.date.value.isValid()) ?
            this.date.value.format(format.MM) : '', this,
            v => this.values.month.value = v),

        year: _inputValues('year', names.DATE_YEAR, (this.date.value && this.date.value.isValid()) ?
            this.date.value.format(format.YYYY) : '', this,
            v => this.values.year.value = v),

        name: this.attrs.ww.name,

        help: {

            id: 'help',
            success: this.attrs.ww.success,
            error: this.attrs.ww.error,
            warning: this.attrs.ww.warning

        }
    };

    /**
     * calculate the date based on the current value of the inputs.
     */
    calculate(): moment.Moment {

        let date = [
            this.values.year.value,
            this.values.month.value,
            this.values.day.value].filter(d => d);

        return (date.length != 3) ? null : moment(date.join(this.date.sep), moment.ISO_8601);

    };

    /**
     * fireChange
     * @private
     */
    fireChange(): void {

        if (this.date.value && this.date.value.isValid())
            this.values.delegate.onChange(
                new DateChangedEvent(
                    this.values.name,
                    this.date.value.format(this.date.format)));

    }

}
