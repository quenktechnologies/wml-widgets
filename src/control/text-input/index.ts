import * as views from './wml/text-input';
import { View } from '@quenk/wml';
import { concat } from '../../util';
import { BLOCK } from '../../content/orientation';
import { Size, getSizeClassName } from '../../content/size';
import { 
  FeedbackControlAttrs,
  AbstractFeedbackControl,
  getValidationStateClassName } from '../feedback';
import { getId, getClassName } from '../../';
import {  Event, getName } from '../';

///classNames:begin
export const TEXT_INPUT = 'ww-text-input';
///classNames:end

/**
 * TextInputAttrs
 */
export interface TextInputAttrs extends FeedbackControlAttrs<string> {

    /**
     * placeholder sets placeholder text for the control.
     */
    placeholder?: string,

    /**
     * type of the text field.
     */
    type?: string,

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
export class TextInput extends AbstractFeedbackControl<string, TextInputAttrs> {

    view: View = (this.attrs.ww && this.attrs.ww.rows && this.attrs.ww.rows > 1) ?
        new views.Textarea(this) : new views.Input(this);

    values = {

        control: {

            wml: {

                id: 'root'

            }
        },
        messages: {

            wml: {

                id: '<N/A>'

            }

        },
        id: getId(this.attrs),

        className: concat(TEXT_INPUT,

            getClassName(this.attrs),

            (this.attrs.ww && this.attrs.ww.size) ?
                getSizeClassName(this.attrs.ww.size) : '',

          (this.attrs.ww && this.attrs.ww.validationState) ?
          getValidationStateClassName(this.attrs.ww.validationState) : '',

            (this.attrs.ww && this.attrs.ww.block) ?
                BLOCK : ''
        ),

        name: getName(this.attrs),

        type: (this.attrs.ww && this.attrs.ww.type) ?
            this.attrs.ww.type : 'text',

        placeholder: (this.attrs.ww && this.attrs.ww.placeholder) ?
            this.attrs.ww.placeholder : '',

        value: (this.attrs.ww && this.attrs.ww.value) ?
            this.attrs.ww.value : '',

        rows: (this.attrs.ww && this.attrs.ww.rows) ?
            this.attrs.ww.rows : 1,

        disabled: (this.attrs.ww && this.attrs.ww.disabled === true) ?
            true : null,

        readOnly: (this.attrs.ww && this.attrs.ww.readOnly === true) ?
            true : null,

        oninput: dispatchInput(this)

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
