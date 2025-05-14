import * as views from './wml/text-input';

import { View } from '@quenk/wml';

import { tick } from '@quenk/noni/lib/control/timer';
import { merge } from '@quenk/noni/lib/data/record';

import { concat } from '../../util';
import { BLOCK } from '../../content/orientation';
import { Size, getSizeClassName } from '../../content/size';
import {
    FocusableAttrs,
    Focusable,
    FocusGainedEvent,
    FocusLostEvent,
    focus
} from '../focus';
import { getId, getClassName } from '../../';
import { ControlAttrs, AbstractControl, Event, getName } from '../';

///classNames:begin
export const TEXT_INPUT = 'ww-text-input';
///classNames:end

/**
 * TextInputAttrs
 */
export interface TextInputAttrs extends ControlAttrs<string>, FocusableAttrs {
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
     * size of the TextInput
     */
    size?: Size;

    /**
     * block orientation flag.
     */
    block?: boolean;

    /**
     * rows
     *
     * Setting this to anything more than 1 will result in a <textarea>
     */
    rows?: number;

    /**
     * readOnly indicates the TextInput is read only.
     */
    readOnly?: boolean;

    /**
     * dsiabled indicates whether the control can be manipulated or not.
     */
    disabled?: boolean;

    /**
     * html attributes to pass directly to the underlying input.
     */
    html?: object;

    /**
     * onChange handler
     */
    onChange?: (e: TextChangedEvent) => void;
}

/**
 * TextChangedEvent
 */
export class TextChangedEvent extends Event<string> {}

/**
 * TextInput provides some extra styling to the native input.
 */
export class TextInput
    extends AbstractControl<string, TextInputAttrs>
    implements Focusable
{
    view: View =
        this.attrs && this.attrs.rows && this.attrs.rows > 1
            ? new views.Textarea(this)
            : new views.Input(this);

    length = this.attrs && this.attrs.length ? this.attrs.length : Infinity;

    values = {
        control: {
            wml: {
                id: 'root'
            }
        },

        attrs: merge(this.attrs.html || {}, {
            id: getId(this.attrs),

            class: concat(
                TEXT_INPUT,

                getClassName(this.attrs),

                this.attrs && this.attrs.size
                    ? getSizeClassName(this.attrs.size)
                    : '',

                this.attrs && this.attrs.block ? BLOCK : ''
            ),

            name: getName(this.attrs),

            type: this.attrs && this.attrs.type ? this.attrs.type : 'text',

            min: this.attrs && this.attrs.min ? String(this.attrs.min) : null,

            max: this.attrs && this.attrs.max ? String(this.attrs.max) : null,

            match: new RegExp(
                this.attrs && this.attrs.match ? this.attrs.match : '.'
            ),

            placeholder:
                this.attrs && this.attrs.placeholder
                    ? this.attrs.placeholder
                    : '',

            value: this.attrs && this.attrs.value ? this.attrs.value : '',

            rows: String(this.attrs && this.attrs.rows ? this.attrs.rows : 1),

            disabled: this.attrs && this.attrs.disabled === true ? true : null,

            readOnly: this.attrs && this.attrs.readOnly === true ? true : null,

            onkeydown: (e: KeyboardEvent) => {
                if (e.key.length === 1) {
                    let value = (<HTMLInputElement>e.target).value || '';

                    if (
                        !this.values.attrs.match.test(e.key) ||
                        value.length > this.length
                    )
                        e.preventDefault();
                }
            },

            oninput: dispatchInput(this),

            autofocus: this.attrs && this.attrs.focus ? true : undefined,

            onfocus: () => {
                if (this.attrs && this.attrs.onFocusGained)
                    this.attrs.onFocusGained(
                        new FocusGainedEvent(getName(this.attrs))
                    );
            },

            onblur: () => {
                if (this.attrs && this.attrs.onFocusLost)
                    this.attrs.onFocusLost(
                        new FocusLostEvent(getName(this.attrs))
                    );
            }
        })
    };

    rendered() {
        if (this.values.attrs.autofocus === true) this.focus();
    }

    focus() {
        return tick(() => focus(this.view, this.values.control.wml.id));
    }
}

/**
 * dispatchInput when the user inputs some text.
 */
const dispatchInput = (i: TextInput) => (e: KeyboardEvent) => {
    if (i.attrs && i.attrs.onChange)
        i.attrs.onChange(
            new TextChangedEvent(
                i.attrs && i.attrs.name ? i.attrs.name : '',
                (<HTMLInputElement>e.target).value
            )
        );
};
