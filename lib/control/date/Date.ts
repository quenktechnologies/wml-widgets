import * as views from './wml/date';
import * as wml from '@quenk/wml';
import * as names from '@package/wml-widgets/common/names';
import * as moment from 'moment';
import { concat } from '@package/wml-widgets/common/util';
import { state } from '@package/wml-widgets/control/feedback-control';
import { Delegate, DefaultDelegate } from '@package/wml-widgets/control';
import { FormControlWidget } from '@package/wml-widgets/control/form-control';
import { DateAttrs, DateValues, format, MONTHS, prefix, inputValues } from '.';
import { DateChangedEvent } from './DateChangedEvent';

/**
 * Date input.
 */
export class Date extends FormControlWidget<string, DateAttrs> {

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
            class: concat(names.DATE, 'form-group', this.attrs.ww.class, state(this.attrs.ww)),

        },
        inline: {

            class: 'form-inline'
        },
        date: {

            months: MONTHS.map((label, value) => ({ label, value: prefix(value + 1) })),
            prefix: prefix

        },
        delegate: this.delegate,
        day: inputValues('day', names.DATE_DAY, (this.date.value && this.date.value.isValid()) ?
            this.date.value.format(format.DD) : '', this,
            v => this.values.day.value = prefix(v)),

        month: inputValues('month', names.DATE_MONTH, (this.date.value && this.date.value.isValid()) ?
            this.date.value.format(format.MM) : '', this,
            v => this.values.month.value = v),

        year: inputValues('year', names.DATE_YEAR, (this.date.value && this.date.value.isValid()) ?
            this.date.value.format(format.YYYY) : '', this,
            v => this.values.year.value = v),

        name: this.attrs.ww.name,

        help: {

            id: 'helps',
            success: this.attrs.ww.success,
            error: this.attrs.ww.error,
            warning: this.attrs.ww.warning

        },
        label: {

            id: this.attrs.ww.name,
            text: this.attrs.ww.label || ''

        }

    };

    value(): string {

        return this.calculate().format(this.date.format);

    }

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
