import * as views from './wml/text-field';
import { Maybe } from '@quenk/noni/lib/data/maybe';
import { View } from '@quenk/wml';
import { concat, getById } from '../../util';
import {
    Message,
    getValidityClassName,
    getMessage,
} from '../feedback';
import { FormControlAttrs, AbstractFormControl, getLabel } from '../form';
import { TextChangedEvent } from '../text-input';
import { Help } from '../help';
import { getId, getClassName } from '../../';
import { getName } from '../';

export { TextChangedEvent }

///classNames:begin
export const TEXT_FIELD = 'ww-text-field';
///classNames:end

/**
 * TextFieldAttrs
 */
export interface TextFieldAttrs extends FormControlAttrs<string> {

    /**
     * placeholder sets placeholder text for the control.
     */
    placeholder?: string,

    /**
     * type of the text field.
     */
    type?: string,

    /**
     * min amount if the type is number.
     */
    min?: number,

    /**
     * max amount if the type is number.
     */
    max?: number,

    /**
     * rows more than 1 will use a textarea instead of an input.
     */
    rows?: number,

    /**
     * readOnly indicates the TextField is read only.
     */
    readOnly?: boolean

    /**
     * focus indicates this input should steal focus when rendered.
     */
    focus?: boolean,

    /**
     * onChange handler
     */
    onChange?(e: TextChangedEvent): void

}

/**
 * TextField provides a wrapped native text input control.
 */
export class TextField extends AbstractFormControl<string, TextFieldAttrs> {

    view: View = new views.Main(this);

    values = {

        root: {

            wml: {

                id: 'root'

            },

            className: concat(TEXT_FIELD,

                getClassName(this.attrs),

                getValidityClassName(this.attrs)

            )

        },
        messages: {

            wml: {

                id: 'message'

            },
            text: getMessage(this.attrs)

        },

        label: {

            id: getName(this.attrs),

            text: getLabel(this.attrs)

        },
        control: {

            wml: {

                id: 'control'

            },

            id: getId(this.attrs),

            name: getName(this.attrs),

            type: (this.attrs.ww && this.attrs.ww.type) ?
                this.attrs.ww.type : 'text',

            min: (this.attrs.ww && this.attrs.ww.min) ?
                this.attrs.ww.min : undefined,

            max: (this.attrs.ww && this.attrs.ww.max) ?
                this.attrs.ww.max : undefined,

            focus: (this.attrs.ww && this.attrs.ww.focus) ?
                this.attrs.ww.focus : undefined,

            placeholder: (this.attrs.ww && this.attrs.ww.placeholder) ?
                this.attrs.ww.placeholder : '',

            value: (this.attrs.ww && this.attrs.ww.value) ?
                this.attrs.ww.value : '',

            disabled: (this.attrs.ww && this.attrs.ww.disabled) ? true : undefined,

            readOnly: (this.attrs.ww && this.attrs.ww.readOnly) ?
                true : undefined,

            rows: (this.attrs.ww && this.attrs.ww.rows) ?
                this.attrs.ww.rows : 1,

            oninput: (this.attrs.ww && this.attrs.ww.onChange) ?
                oninput(this) : () => { },

            onChange: (this.attrs.ww && this.attrs.ww.onChange) ?
                this.attrs.ww.onChange : () => { }

        }

    };

    setMessage(msg: Message): TextField {

        getHelp(this).map(h => h.setMessage(msg));
        return this;

    }

    removeMessage(): TextField {

        getHelp(this).map(h => h.removeMessage());
        return this;

    }

}

const getHelp = (t: TextField): Maybe<Help> =>
    getById(t.view, t.values.messages.wml.id);

const oninput = (f: TextField) => (e: KeyboardEvent) => {

    if (f.attrs.ww && f.attrs.ww && f.attrs.ww.onChange)
        f.attrs.ww.onChange(
            new TextChangedEvent((f.attrs.ww && f.attrs.ww.name) ?
                f.attrs.ww.name : '',
                (<HTMLInputElement>e.target).value));

}
