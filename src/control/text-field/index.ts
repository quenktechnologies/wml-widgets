import * as views from './wml/text-field';

import { View } from '@quenk/wml';

import { Maybe } from '@quenk/noni/lib/data/maybe';

import { BLOCK } from '../../content/orientation';
import { concat, getById } from '../../util';
import { Message, getValidityClassName, getMessage } from '../feedback';
import { FormControlAttrs, AbstractFormControl, getLabel } from '../form';
import { TextChangedEvent } from '../text-input';
import { Help } from '../help';
import { getId, getClassName } from '../../';
import { getName } from '../';

export { TextChangedEvent };

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
    placeholder?: string;

    /**
     * type of the text field.
     */
    type?: string;

    /**
     * min amount if the type is number.
     */
    min?: number;

    /**
     * max amount if the type is number.
     */
    max?: number;

    /**
     * match if specified restricts input to characters matching the
     * specified pattern.
     */
    match?: string;

    /**
     * length indicates the max number of characters allowed to be input.
     */
    length?: number;

    /**
     * rows more than 1 will use a textarea instead of an input.
     */
    rows?: number;

    /**
     * readOnly indicates the TextField is read only.
     */
    readOnly?: boolean;

    /**
     * focus indicates this input should steal focus when rendered.
     *
     */
    focus?: boolean;

    /**
     * html attributes to pass directly to the underlying input.
     */
    html?: object;

    /**
     * onChange handler
     */
    onChange?(e: TextChangedEvent): void;
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

            className: concat(
                TEXT_FIELD,

                getClassName(this.attrs),

                BLOCK,

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
            wml: { id: 'root' },

            attrs: {
                id: getId(this.attrs),

                name: getName(this.attrs),

                type: this.attrs && this.attrs.type ? this.attrs.type : 'text',

                min: this.attrs && this.attrs.min ? this.attrs.min : undefined,

                max: this.attrs && this.attrs.max ? this.attrs.max : undefined,

                focus:
                    this.attrs && this.attrs.focus
                        ? this.attrs.focus
                        : undefined,

                placeholder:
                    this.attrs && this.attrs.placeholder
                        ? this.attrs.placeholder
                        : '',

                match:
                    this.attrs && this.attrs.match
                        ? this.attrs.match
                        : undefined,

                length:
                    this.attrs && this.attrs.length
                        ? this.attrs.length
                        : undefined,

                value: this.attrs && this.attrs.value ? this.attrs.value : '',

                disabled: this.attrs && this.attrs.disabled ? true : undefined,

                readOnly: this.attrs && this.attrs.readOnly ? true : undefined,

                rows: this.attrs && this.attrs.rows ? this.attrs.rows : 1,

                oninput:
                    this.attrs && this.attrs.onChange
                        ? oninput(this)
                        : () => {},

                onChange:
                    this.attrs && this.attrs.onChange
                        ? this.attrs.onChange
                        : () => {},

                html: this.attrs.html
            }
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
    if (f.attrs && f.attrs && f.attrs.onChange)
        f.attrs.onChange(
            new TextChangedEvent(
                f.attrs && f.attrs.name ? f.attrs.name : '',
                (<HTMLInputElement>e.target).value
            )
        );
};
