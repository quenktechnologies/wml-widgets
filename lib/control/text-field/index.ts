import * as views from './wml/text-field';
import { Maybe } from '@quenk/noni/lib/data/maybe';
import { View } from '@quenk/wml';
import { concat, getById } from '../../util';
import {
    ValidationState,
    Message,
    getValidationStateClassName,
    setValidationState,
    removeValidationState
} from '../feedback';
import { FormControlAttrs, AbstractFormControl } from '../form';
import { TextChangedEvent, TextInput } from '../text-input';
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
    type?: string

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

    get = () => input(this).map(e => e.value).get();

    set = (v: string) => input(this).map(e => { e.value = v; return this; }).get();

    values = {

        root: {

            wml: {

                id: 'root'

            },

            className: concat(TEXT_FIELD,

                getClassName(this.attrs),

                getValidationStateClassName(getVState(this))

            )

        },
        messages: {

            wml: {

                id: 'message'

            },
            text: (this.attrs.ww && this.attrs.ww.message) ?
                this.attrs.ww.message : '',

        },

        label: {

            id: getName(this.attrs),

            text: (this.attrs.ww && this.attrs.ww.label) ?
                this.attrs.ww.label : '',


        },
        control: {

            wml: {

                id: 'control'

            },

            id: getId(this.attrs),

            name: getName(this.attrs),

          type: (this.attrs.ww && this.attrs.ww.type) ?
          this.attrs.ww.type : 'text',

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

            validationState: getVState(this),

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

    setValidationState(state: ValidationState): TextField {

        getInput(this).map(i => i.setValidationState(state));
        setValidationState(this.view, this.values.root.wml.id, state);
        return this;

    }

    removeValidationState(): TextField {

        getInput(this).map(i => i.removeValidationState());
        removeValidationState(this.view, this.values.root.wml.id);
        return this;

    }

    getValidationState(): ValidationState {

        return getInput(this).map(i => i.getValidationState()).get();

    }

}


const getHelp = (t: TextField): Maybe<Help> =>
    getById(t.view, t.values.messages.wml.id);

const getInput = (t: TextField): Maybe<TextInput> =>
    getById(t.view, t.values.control.wml.id);

const getVState = (t: TextField): ValidationState =>
    (t.attrs.ww && t.attrs.ww.validationState) ?
        t.attrs.ww.validationState :
        ValidationState.Neutral

const oninput = (f: TextField) => (e: KeyboardEvent) => {

    if (f.attrs.ww && f.attrs.ww && f.attrs.ww.onChange)
        f.attrs.ww.onChange(
            new TextChangedEvent((f.attrs.ww && f.attrs.ww.name) ?
                f.attrs.ww.name : '',
                (<HTMLInputElement>e.target).value));

}

const input = (f: TextField) =>
    getById<HTMLInputElement>(f.view, f.values.control.wml.id);
