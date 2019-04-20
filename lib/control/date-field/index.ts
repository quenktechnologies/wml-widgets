import * as views from './wml/date-field';
import * as moment from 'moment';
import { View } from '@quenk/wml';
import { Maybe, nothing, just } from '@quenk/noni/lib/data/maybe';
import { concat, getById } from '../../util';
import { FormControlAttrs, FormControl } from '../form';
import {
    FeedbackControlAttrs,
    ValidationState,
    AbstractFeedbackControl,
    getVSClassNameFromAttrs
} from '../feedback';
import { WidgetAttrs, getId, getClassName } from '../../';
import { Event as ControlEvent } from '../';

///classNames:begin
export const DATE_FIELD = 'ww-date-field';
export const DATE_FIELD_DAY = `${DATE_FIELD}__day`;
export const DATE_FIELD_MONTH = `${DATE_FIELD}__month`;
export const DATE_FIELD_YEAR = `${DATE_FIELD}__year`;
///classNames:end

/**
 * DateFieldAttrs
 */
export interface DateFieldAttrs
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

/**
 * DateField
 */
export class DateField extends AbstractFeedbackControl<string, DateFieldAttrs>
    implements FormControl<string, DateFieldAttrs> {

    view: View = new views.Main(this);

    values = {

        root: {

            wml: {

                id: 'root'

            },

            id: getId(this.attrs),

            className: concat(
                DATE_FIELD,
                getClassName(this.attrs),
                getVSClassNameFromAttrs(this.attrs)),

        },
        control: {

            wml: {

                id: 'root'

            },
            id: getId(this.attrs)

        },
        day: {

            wml: {

                id: 'day'

            },

            className: DATE_FIELD_DAY,

            value: getDay(this.attrs),

            disabled: (this.attrs.ww &&
                this.attrs.ww.disabled === true) ?
                true : null,

            oninput: (e: KeyboardEvent) => {

                (<HTMLInputElement>e.target).oninput = null;
                this.values.day.onkeyup(e);

            },
            onkeyup: (e: Event): void => {

                let value = (<HTMLInputElement>e.target).value;

                this.values.day.value = value;
                this.update();

            }

        },
        month: {

            wml: {

                id: 'month'

            },

            className: DATE_FIELD_MONTH,

            value: getMonth(this.attrs),

            disabled: (this.attrs.ww && this.attrs.ww.disabled === true) ?
                true : null,

            oninput: (e: KeyboardEvent) => {

                (<HTMLInputElement>e.target).oninput = null;
                this.values.year.onkeyup(e);

            },
            onkeyup: (e: Event): void => {

                this.values.month.value = (<HTMLInputElement>e.target).value;
                this.update();

            }

        },
        year: {

            wml: {

                id: 'year'

            },

            className: DATE_FIELD_YEAR,

            value: getYear(this.attrs),

            disabled: (this.attrs.ww && this.attrs.ww.disabled === true) ?
                true : null,

            oninput: (e: KeyboardEvent) => {

                (<HTMLInputElement>e.target).oninput = null;
                this.values.year.onkeyup(e);

            },
            onkeyup: (e: Event): void => {

                this.values.year.value = (<HTMLInputElement>e.target).value;
                this.update();

            }

        },
        name: (this.attrs.ww && this.attrs.ww.name) || '<name>',
        messages: {

            wml: {

                id: 'messages'

            },
            text: (this.attrs.ww && this.attrs.ww.message) ?
                this.attrs.ww.message : '',

        },
        label: {

            id: (this.attrs.ww && this.attrs.ww.name) || '',

            text: (this.attrs.ww && this.attrs.ww.label) || ''

        }

    };

    /**
     * @private
     */
    update() {

        let mayM = getCurrentValue(this);

        if (mayM.isJust()) {

            let m = mayM.get();

            if (!m.isValid()) {

                this.setValidationState(ValidationState.Error);

            } else {

                this.removeValidationState();

            }

            this.fire(m);

        }

    }

    /**
     * @private
     */
    fire(value: moment.Moment): void {

        if (this.attrs.ww && this.attrs.ww.onChange)
            this.attrs.ww.onChange(
                new DateChangedEvent(
                    this.values.name,
                    value.format('ll')));

    }

}

const getDate = (attrs: WidgetAttrs<DateFieldAttrs>): Maybe<moment.Moment> => {

    if (attrs.ww && attrs.ww.value) {

        let m = moment(attrs.ww.value, moment.ISO_8601);

        if (m.isValid())
            return just(m);

    }

    return nothing();

}

const getDay = (attrs: WidgetAttrs<DateFieldAttrs>): string => {

    let mayDate = getDate(attrs);

    if (mayDate.isNothing())
        return '';

    return '' + mayDate.get().date();

}

const getMonth = (attrs: WidgetAttrs<DateFieldAttrs>): string => {

    let mayDate = getDate(attrs);

    if (mayDate.isNothing())
        return '';

    return '' + (mayDate.get().month() + 1);

}

const getYear = (attrs: WidgetAttrs<DateFieldAttrs>): string => {

    let mayDate = getDate(attrs);

    if (mayDate.isNothing())
        return '';

    return '' + mayDate.get().year();

}

const getCurrentValue = (self: DateField): Maybe<moment.Moment> => {

    let mDay = getById<HTMLInputElement>(self.view, self.values.day.wml.id);

    if (mDay.isNothing()) return nothing();

    let mMonth = getById<HTMLInputElement>(self.view, self.values.month.wml.id);

    if (mMonth.isNothing()) return nothing();

    let mYear = getById<HTMLInputElement>(self.view, self.values.year.wml.id);

    if (mYear.isNothing()) return nothing();

    let year = mYear.get().value;
    let month = mMonth.get().value;
    let day = mDay.get().value;

    return just(moment(`${year}-${month}-${day}`, moment.ISO_8601));

}
