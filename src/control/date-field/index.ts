import * as views from './wml/date-field';
import * as moment from 'moment';
import { View } from '@quenk/wml';
import { Maybe, nothing, just } from '@quenk/noni/lib/data/maybe';
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
import { WidgetAttrs, getId, getClassName } from '../../';
import { Event as ControlEvent, getName } from '../';
import { getBlockClassName } from '../../content/orientation';

///classNames:begin
export const DATE_FIELD = 'ww-date-field';
export const DATE_FIELD_INPUT = 'ww-date-field__input';
///classNames:end

export const DEFAULT_INPUT_FORMAT = moment.ISO_8601;
export const DEFAULT_INPUT_PLACEHOLDER = 'YYYY-MM-DD';
export const DEFAULT_INPUT_DISPLAY = 'YYYY-MM-DD';
export const VALUE_FORMAT = 'YYYY-MM-DD';
export const DELAY = 200;
export const TODAY = 'today';
export const NOW = 'now';
export const YESTERDAY = 'yesterday';

export const iso8601Formats = [

    'YYYY-MM-DD',
    'YYYY-MM-D',
    'YYYY-M-DD',
    'YYYY-M-D',
    'YY-MM-DD',
    'YY-MM-D',
    'YY-M-DD',
    'YY-M-D',

    'YYYY/MM/DD',
    'YYYY/MM/D',
    'YYYY/M/DD',
    'YYYY/M/D',
    'YY/MM/DD',
    'YY/MM/D',
    'YY/M/DD',
    'YY/M/D',

    'YYYY MM DD',
    'YYYY MM D',
    'YYYY M DD',
    'YYYY M D',
    'YY MM DD',
    'YY MM D',
    'YY M DD',
    'YY M D',

    'YYYYMMDD',
    'YYYYMMD',
    'YYYYMDD',
    'YYYYMD',
    'YYMMDD',
    'YYMMD',
    'YYMDD',
    'YYMD',

];

export const commonFormats = [

    'DD-MM-YYYY',
    'D-MM-YYYY',
    'DD-M-YYYY',
    'D-M-YYYY',
    'DD-MM-YY',
    'D-MM-YY',
    'DD-M-YY',
    'D-M-YY',

    'DD/MM/YYYY',
    'D/MM/YYYY',
    'DD/M/YYYY',
    'D/M/YYYY',
    'DD/MM/YY',
    'D/MM/YY',
    'DD/M/YY',
    'D/M/YY',

    'DD MM YYYY',
    'D MM YYYY',
    'DD M YYYY',
    'D M YYYY',
    'DD MM YY',
    'D MM YY',
    'DD M YY',
    'D M YY',

    'DDMMYYYY',
    'DMMYYYY',
    'DDMYYYY',
    'DMYYYY',
    'DDMMYY',
    'DMMYY',
    'DDMYY',
    'DMYY',

];

export const usFormats = [

    'MM-DD-YYYY',
    'MM-D-YYYY',
    'M-DD-YYYY',
    'M-D-YYYY',
    'MM-DD-YY',
    'MM-D-YY',
    'M-DD-YY',
    'M-D-YY',

    'MM/DD/YYYY',
    'MM/D/YYYY',
    'M/DD/YYYY',
    'M/D/YYYY',
    'MM/DD/YY',
    'MM/D/YY',
    'M/DD/YY',
    'M/D/YY',

    'MM DD YYYY',
    'MM D YYYY',
    'M DD YYYY',
    'M D YYYY',
    'MM DD YY',
    'MM D YY',
    'M DD YY',
    'M D YY',

    'MMDDYYYY',
    'MMDYYYY',
    'MDDYYYY',
    'MDYYYY',
    'MMDDYY',
    'MMDYY',
    'MDDYY',
    'MDYY',

];

/**
 * Format is used to determine what format input should be parsed as.
 */
export enum Format {

    ISO8601 = 1,

    COMMON = 2,

    USA = 3

}

/**
 * ISO8601Date type.
 */
export type ISO8601Date = string;

/**
 * DateFieldAttrs
 */
export interface DateFieldAttrs extends FormControlAttrs<ISO8601Date> {

    /**
     * placeholder
     */
    placeholder?: string,

    /**
     * block 
     */
    block?: boolean,

    /**
     * format specifies what formats will be allowed for date input.
     */
    format?: Format,

    /**
     * display format used to display the value of the field when set.
     *
     * Must be one of moment's supported formats.
     */
    display?: string,

    /**
     * onChange handler.
     */
    onChange: (e: DateChangedEvent) => void;

}


/**
 * DateChangedEvent is generated when a valid date has been entered.
 *
 * The value is a truncated ISO8601 string consisting of the date part alone.
 */
export class DateChangedEvent extends ControlEvent<ISO8601Date> { }

/**
 * DateField provides a text field for entering dates.
 *
 * It will only fire change events when the date input matches one 
 * of the 3 format sets (ISO8601,Common,US).
 *
 * If the user removes focus and the entry is not valid, it will be ignored
 * and no change event will be fired. Once a valid date has been entered,
 * the value displayed can be formated using the format specified in the 
 * "display" attribute. This does not affect the actual value provided
 * to onChange handlers.
 */
export class DateField extends AbstractFormControl<ISO8601Date, DateFieldAttrs> {

    view: View = new views.Main(this);

    values = {

        root: {

            wml: { id: 'root' },

            id: getId(this.attrs),

            className: concat(
                DATE_FIELD,
                getClassName(this.attrs),
                getBlockClassName(this.attrs),
                getValidityClassName(this.attrs)),

        },
        control: {

            wml: { id: 'input' },
            id: getId(this.attrs)

        },

        label: {

            id: (this.attrs.ww && this.attrs.ww.name) || '',

            text: (this.attrs.ww && this.attrs.ww.label) || ''

        },

        messages: {

            wml: {

                id: 'messages'

            },
            text: getMessage(this.attrs)

        },

        input: {

            wml: { id: 'input' },

            className: DATE_FIELD_INPUT,

            name: getName(this.attrs),

            format: getFormat(this.attrs),

            placeholder: (this.attrs.ww && this.attrs.ww.placeholder) ?
                this.attrs.ww.placeholder : '',

            display: getDisplay(this.attrs),

            moment: <Maybe<moment.Moment>>((this.attrs.ww && this.attrs.ww.value) ?
                just(parseDate(getValue(this.attrs), getFormat(this.attrs))) :
                nothing()),

            value: () => (this.values.input.moment.isJust() &&
                this.values.input.moment.get().isValid()) ?
                this.values.input.moment.get().format(this.values.input.display) : '',

            disabled: (this.attrs.ww && this.attrs.ww.disabled === true) ?
                true : null,

            onfocus: (e: KeyboardEvent) => {

                (<HTMLInputElement>e.target).select();

            },

            oninput: (e: KeyboardEvent) => {

                (<HTMLInputElement>e.target).oninput = null;
                this.values.input.onkeyup(e);

            },

            onkeyup: debounce((e: Event): void => {

                let value = (<HTMLInputElement>e.target).value;
                let m = parseDate(value, this.values.input.format);

                if (m.isValid()) {

                    this.values.input.moment = just(m);

                    this.fireChange();

                }

            }, DELAY),

            onblur: () => {

                this.view.invalidate();

            }

        }

    };

    /**
     * @private
     */
    fireChange(): void {

        if (this.values.input.moment.isJust()) {

            let m = this.values.input.moment.get();

            if (m.isValid() && (this.attrs.ww && this.attrs.ww.onChange))
                this.attrs.ww.onChange(new DateChangedEvent(
                    this.attrs.ww.name || '', m.format(VALUE_FORMAT)));

        }

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


const parseDate = (d: string, formats: string[]) => {

    let str = d.toLowerCase();

    if ((str === TODAY) || (str === NOW)) {

        return moment.utc();

    } else if (str === YESTERDAY) {

        return moment.utc().subtract(1, 'd');

    } else {

        return moment.utc(d, formats, true);

    }

}

const getValue = (attrs: WidgetAttrs<DateFieldAttrs>): string =>
    (attrs.ww && attrs.ww.value) ? attrs.ww.value : '';

const getFormat = (attrs: WidgetAttrs<DateFieldAttrs>): string[] => {

    if (attrs.ww && attrs.ww.format) {

        switch (attrs.ww.format) {

            case 2:
                return commonFormats;

            case 3:
                return usFormats;

            default:
                break;

        }

    }

    return iso8601Formats;

}

const getDisplay = (attrs: WidgetAttrs<DateFieldAttrs>): string =>
    (attrs.ww && attrs.ww.display) ? attrs.ww.display : DEFAULT_INPUT_DISPLAY;
