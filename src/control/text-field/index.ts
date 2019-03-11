import * as views from './wml/text-field';
import { Fun, View } from '@quenk/wml';
import { concat, getById } from '../../util';
import { FormControlAttrs, AbstractFormControl } from '../form';
import { getId, getClassName } from '../../';
import { Event, getName } from '../';

const oninput = (f: TextField) => (e: KeyboardEvent) => {

    if (f.attrs.ww && f.attrs.ww && f.attrs.ww.onChange)
    f.attrs.ww.onChange(
      new TextChangedEvent((f.attrs.ww && f.attrs.ww.name) ?
            f.attrs.ww.name : '',
            (<HTMLInputElement>e.target).value));

}

const input = (f: TextField) =>
    getById<HTMLInputElement>(f.view, f.values.control.wml.id);

///classNames:begin
export const TEXT_FIELD = 'form-control';
///classNames:end

/**
 * TextFieldTemplate describes the template used to render 
 * the TextField.
 */
export type TextFieldTemplate = (f: TextField) => Fun;

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
     * controlTemplate is a template for rendering the control.
     */
    controlTemplate?: TextFieldTemplate,

    /**
     * onChange handler
     */
    onChange?(e: TextChangedEvent): void

}

/**
 * TextChangedEvent 
 */
export class TextChangedEvent extends Event<string> { }

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

            id: getId(this.attrs),

            className: concat(TEXT_FIELD, getClassName(this.attrs))

        },
        messages: {

            wml: {

                id: 'message'

            }

        },

        label: {

            id: getName(this.attrs),

            text: (this.attrs.ww && this.attrs.ww.label) ? this.attrs.ww.label : ''

        },
        control: {

            wml: {

                id: 'control'

            },

            template: (): TextFieldTemplate =>
                (this.attrs.ww && this.attrs.ww.controlTemplate) ?
                    this.attrs.ww.controlTemplate : views.group,

            name: getName(this.attrs),

            type: 'text',

            focus: (this.attrs.ww && this.attrs.ww.focus) ?
                this.attrs.ww.focus : null,

            placeholder: (this.attrs.ww && this.attrs.ww.placeholder) ?
                this.attrs.ww.placeholder : '',

            value: (this.attrs.ww && this.attrs.ww.value) ?
                this.attrs.ww.value : '',

            disabled: (this.attrs.ww && this.attrs.ww.disabled) ? true : null,

            readOnly: (this.attrs.ww && this.attrs.ww.readOnly) ?
                true : null,

            rows: (this.attrs.ww && this.attrs.ww.rows) ?
                this.attrs.ww.rows : 1,

            oninput: (this.attrs.ww && this.attrs.ww.onChange) ?
                oninput(this) : () => { }

        }

    };

}
