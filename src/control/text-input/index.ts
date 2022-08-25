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
export interface TextInputAttrs
    extends
    ControlAttrs<string>, FocusableAttrs {

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
     * match if specified restricts input to characters matching the 
     * specified pattern.
     */
    match?: string,

    /**
     * length indicates the max number of characters allowed to be input.
     */
    length?: number,

    /**
     * size of the TextInput
     */
    size?: Size,

    /**
     * block orientation flag.
     */
    block?: boolean,

    /**
     * rows
     * 
     * Setting this to anything more than 1 will result in a <textarea>
     */
    rows?: number,

    /**
     * readOnly indicates the TextInput is read only.
     */
    readOnly?: boolean,

    /**
     * dsiabled indicates whether the control can be manipulated or not.
     */
    disabled?: boolean,

    /**
     * html attributes to pass directly to the underlying input.
     */
    html?: object,

    /**
     * onChange handler
     */
    onChange?: (e: TextChangedEvent) => void

}

/**
 * TextChangedEvent 
 */
export class TextChangedEvent extends Event<string> { }

/**
 * TextInput provides some extra styling to the native input.
 */
export class TextInput
    extends
    AbstractControl<string, TextInputAttrs>
    implements Focusable {

    view: View = (this.attrs.ww && this.attrs.ww.rows && this.attrs.ww.rows > 1) ?
        new views.Textarea(this) : new views.Input(this);

    length = (this.attrs.ww && this.attrs.ww.length) ?
        this.attrs.ww.length : Infinity;

    values = {

        control: {

            wml: {

                id: 'root'

            }
        },

        attrs: merge((this.attrs.ww && this.attrs.ww.html) || {}, {

            id: getId(this.attrs),

            className: concat(TEXT_INPUT,

                getClassName(this.attrs),

                (this.attrs.ww && this.attrs.ww.size) ?
                    getSizeClassName(this.attrs.ww.size) : '',

                (this.attrs.ww && this.attrs.ww.block) ?
                    BLOCK : ''
            ),

            name: getName(this.attrs),

            type: (this.attrs.ww && this.attrs.ww.type) ?
                this.attrs.ww.type : 'text',

            min: (this.attrs.ww && this.attrs.ww.min) ?
                String(this.attrs.ww.min) : null,

            max: (this.attrs.ww && this.attrs.ww.max) ?
                String(this.attrs.ww.max) : null,

            match: new RegExp((this.attrs.ww && this.attrs.ww.match) ?
                this.attrs.ww.match : '.'),


            value: (this.attrs.ww && this.attrs.ww.value) ?
                this.attrs.ww.value : '',

            rows: String((this.attrs.ww && this.attrs.ww.rows) ?
                this.attrs.ww.rows : 1),

            disabled: (this.attrs.ww && this.attrs.ww.disabled === true) ?
                true : null,

            readOnly: (this.attrs.ww && this.attrs.ww.readOnly === true) ?
                true : null,

            onkeydown: (e: KeyboardEvent) => {

                if (e.key.length === 1) {

                    let value = (<HTMLInputElement>e.target).value || '';

                    if ((!this.values.attrs.match.test(e.key)) ||
                        (value.length > this.length))
                        e.preventDefault();

                }

            },

            oninput: dispatchInput(this),

            autofocus: (this.attrs.ww && this.attrs.ww.focus) ? true : undefined,

            onfocus: () => {

                if (this.attrs.ww && this.attrs.ww.onFocusGained)
                    this.attrs.ww.onFocusGained(
                        new FocusGainedEvent(getName(this.attrs)))

            },

            onblur: () => {

                if (this.attrs.ww && this.attrs.ww.onFocusLost)
                    this.attrs.ww.onFocusLost(
                        new FocusLostEvent(getName(this.attrs)))

            }

        })
    }

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

    if (i.attrs.ww && i.attrs.ww.onChange)
        i.attrs.ww.onChange(new TextChangedEvent((i.attrs && i.attrs.ww.name) ?
            i.attrs.ww.name : '',
            (<HTMLInputElement>e.target).value));

}
