import { View } from '@quenk/wml';

import { parseDate } from '@quenk/noni/lib/data/datetime';

import { concat, debounce } from '../../util';
import {
    getValidityClassName,
    getMessage,
    Message
}
    from '../feedback';
import {

    FormControlAttrs,
    AbstractFormControl,
    setMessage,
    removeMessage
} from '../form';
import { getId, getClassName } from '../../';
import { Event as ControlEvent, getName } from '../';
import { DateFieldView } from './views';

const DELAY = 400;

///classNames:begin
export const DATE_FIELD = 'ww-date-field';
export const DATE_FIELD_INPUT = 'ww-date-field__input';
///classNames:end

/**
 * ISO8601Date string.
 *
 * The only accepted format is YYYY-MM-DD.
 */
export type ISO8601Date = string;

/**
 * EmptyString indicating the date value was cleared.
 */
export type EmptyString = '';

/**
 * DateFieldAttrs
 */
export interface DateFieldAttrs extends FormControlAttrs<ISO8601Date> {

    /**
     * onChange handler.
     */
    onChange: (e: DateChangedEvent) => void;

}

/**
 * DateChangedEvent is generated when a valid date has been entered.
 *
 * The value is a truncated ISO8601 string consisting of the date part alone or
 * an empty string if the value has been removed.
 */
export class DateChangedEvent extends ControlEvent<ISO8601Date | EmptyString> { }

/**
 * DateField provides a text field for entering dates in ISO8601 format .
 *
 * It will only fire change events when the value of the input is deemed to be 
 * valid or has been cleared. If the user removes focus and the entry is not 
 * valid, it will be ignored.
 */
export class DateField
    extends
    AbstractFormControl<ISO8601Date, DateFieldAttrs> {

    view: View = new DateFieldView(this);

    values = {

        root: {

            wml: { id: 'root' },

            id: getId(this.attrs),

            className: concat(
                DATE_FIELD,
                getClassName(this.attrs),
                getValidityClassName(this.attrs)),

        },

        control: {

            wml: { id: 'input' },

            id: getId(this.attrs)

        },

        label: {

            id: (this.attrs && this.attrs.name) || '',

            text: (this.attrs && this.attrs.label) || ''

        },

        messages: {

            wml: { id: 'messages' },

            text: getMessage(this.attrs)

        },

        input: {

            wml: { id: 'input' },

            className: DATE_FIELD_INPUT,

            name: getName(this.attrs),

            placeholder: 'YYYY-DD-MM',

            value: parseDate(this.attrs.value || ''),

            disabled: (this.attrs && this.attrs.disabled === true) ?
                true : null,

            onfocus: (e: KeyboardEvent) => {

                (<HTMLInputElement>e.target).select();

            },

            oninput: (e: KeyboardEvent) => {

                this.values.input.onkeyup(e);

            },

            onkeyup: debounce((e: Event): void => {

                let value = (<HTMLInputElement>e.target).value;

                if (value === '') {

                    this.values.input.value = '';

                    this.fireChange();

                } else {

                    let val = parseDate(value);

                    if (val !== '') {

                        this.values.input.value = val;

                        this.fireChange();

                    }

                }

            }, DELAY),

            onblur: debounce(() => {

                this.view.invalidate();

            }, DELAY * 2)

        }

    };

    /**
     * @private
     */
    fireChange(): void {

        if (this.attrs.onChange != null)
            this.attrs.onChange(new DateChangedEvent(
                this.attrs.name || '', this.values.input.value));

    }

    setMessage(msg: Message): DateField {

        this.values.messages.text = msg;
        setMessage(this.view, this.values.messages.wml.id, msg);
        return this;

    }

    removeMessage(): DateField {

        this.values.messages.text = '';
        removeMessage(this.view, this.values.messages.wml.id);
        return this;

    }

}
