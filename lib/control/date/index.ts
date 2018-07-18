import * as views from './wml/date';
import * as moment from 'moment';
import { View } from '@quenk/wml';
import { concat } from '../../util';
import { FormControlAttrs, FormControl } from '../form';
import {
    FeedbackControlAttrs,
    GenericFeedbackControl,
    selectState
} from '../feedback';
import { Event as ControlEvent } from '../';

const _prefix = (s: string | number, inc = false): string => {

    let n = Number(s);

    if (inc)
        n = n + 1;

    if (isNaN(n)) return '';

    return (n < 10) ? `0${n}` : `${n}`;

}

const _months = (): { label: string, value: string }[] =>
    MONTHS.map((label, value) => ({ label, value: _prefix(value + 1) }));

///classNames:begin
/**
 * DATE class name.
 */
export const DATE = 'ww-date';

/**
 * DATE_DAY class name.
 */
export const DATE_DAY = `${DATE}__day`;

/**
 * DATE_MONTH class name.
 */
export const DATE_MONTH = `${DATE}__month`;

/**
 * DATE_YEAR class name.
 */
export const DATE_YEAR = `${DATE}__year form-control`;
///classNames:end

/**
 * DateAttrs
 */
export interface DateAttrs
    extends FormControlAttrs<string>, FeedbackControlAttrs<string> {

    /**
     * onChange handler.
     */
    onChange: (e: DateChangedEvent) => void;

}

/**
 * DateChangedEvent is generated when the date has 
 * been changed to a valid date.
 */
export class DateChangedEvent extends ControlEvent<string> { }

export const format = {

    YYYYDDMM: 'YYYY-MM-DD',
    DD: 'DD',
    MM: 'MM',
    YYYY: 'YYYY'
}

export const MONTHS = [
    'Jan', 'Feb', 'Mar',
    'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
];

/**
 * Date input.
 */
export class Date extends GenericFeedbackControl<string, DateAttrs>
    implements FormControl<string, DateAttrs> {

    view: View = new views.Main(this);

    get = () => this.calculate().format(this.values.date.format);

    set = (_: string) => { return this; }

    values = {

        root: {

            id: 'root',
            class: concat(
                DATE,
                'form-group',
                this.attrs.ww && this.attrs.ww.class,
                selectState(this.attrs.ww)),

        },
        inline: {

            class: 'form-inline'
        },
        date: {

            months: _months(),

            value: (this.attrs.ww && this.attrs.ww.value) ?
                moment(this.attrs.ww.value, format.YYYYDDMM) : null,

            sep: '-',

            format: format.YYYYDDMM,

            fire: () => {

                if (this.attrs.ww && this.attrs.ww.onChange)
                    if (this.values.date.value && this.values.date.value.isValid())
                        this.attrs.ww.onChange(
                            new DateChangedEvent(
                                this.values.name,
                                this.values.date.value.format(this.values.date.format)));
            }

        },
        month: {

            id: 'month',

            class: concat(DATE_MONTH, 'form-control'),

            value: () => (this.values.date.value && this.values.date.value.isValid()) ?
                this.values.date.value.format(format.MM) : '',

            disabled: (this.attrs.ww && this.attrs.ww.disabled === true) ?
                true : null,

            onchange: (e: Event): void => {

                this
                    .view
                    .findById(this.values.day.id)
                    .map((e: HTMLInputElement) => { e.focus(); })
                    .map(() => {

                        this.values.month.value =
                            () => (<HTMLInputElement>e.target).value;

                        this.values.date.value = this.calculate();
                        this.values.date.fire();

                    })

            }

        },
        day: {

            id: 'day',

            class: concat(DATE_DAY, 'form-control'),

            value: () => (this.values.date.value && this.values.date.value.isValid()) ?
                this.values.date.value.format(format.DD) : '',

            disabled: (this.attrs.ww && this.attrs.ww.disabled === true) ? true : null,

            oninput: (e: KeyboardEvent) => {

                (<HTMLInputElement>e.target).oninput = null;
                this.values.day.onkeyup(e);

            },
            onkeyup: (e: Event): void => {

                let value = (<HTMLInputElement>e.target).value;

                this.values.day.value =
                    () => _prefix(value);
                this.values.date.value = this.calculate();
                this.values.date.fire();

                if (value.length === 2)
                    this
                        .view
                        .findById(this.values.year.id)
                        .map((e: HTMLInputElement) => e.focus());

            }

        },
        year: {

            id: 'year',

            class: DATE_YEAR,

            value: () => (this.values.date.value && this.values.date.value.isValid()) ?
                this.values.date.value.format(format.YYYY) : '',

            disabled: (this.attrs.ww && this.attrs.ww.disabled === true) ? true : null,

            oninput: (e: KeyboardEvent) => {

                (<HTMLInputElement>e.target).oninput = null;
                this.values.year.onkeyup(e);

            },
            onkeyup: (e: Event): void => {

                this.values.year.value = () => (<HTMLInputElement>e.target).value;
                this.values.date.value = this.calculate();
                this.values.date.fire();

            }

        },
        name: (this.attrs.ww && this.attrs.ww.name) || '<name>',
        messages: {

            id: 'messages',

            success: (this.attrs.ww && this.attrs.ww.success) || undefined,

            error: (this.attrs.ww && this.attrs.ww.error) || undefined,

            warning: (this.attrs.ww && this.attrs.ww.warning) || undefined

        },
        label: {

            id: (this.attrs.ww && this.attrs.ww.name) || '<name>',

            text: (this.attrs.ww && this.attrs.ww.label) || '<label>'

        }

    };

    /**
     * calculate the date based on the current value of the inputs.
     */
    calculate(): moment.Moment {

        let date = [
            this.values.year.value(),
            this.values.month.value(),
            this.values.day.value()].filter(d => d);

        return (date.length != 3) ?
            null :
            moment(date.join(this.values.date.sep), moment.ISO_8601);

    };

}


