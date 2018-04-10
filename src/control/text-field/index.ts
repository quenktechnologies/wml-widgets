import * as views from './wml/text-field';
import { Template, View } from '@quenk/wml';
import { concat } from '../../util';
import { FormControlAttrs, GenericFormControl } from '../form';
import { selectState } from '../feedback';
import { Event } from '../';

const oninput = (f: TextField) => (e: KeyboardEvent) =>
    f.attrs.ww.onChange(new TextChangedEvent(f.attrs.ww.name,
        (<HTMLInputElement>e.target).value));

const input = (f: TextField) =>
    f.view.findById<HTMLInputElement>(f.values.control.id);

///classNames:begin
export const TEXT_FIELD = 'form-control';
///classNames:end

/**
 * TextFieldTemplate describes the template used to render 
 * the TextField.
 */
export type TextFieldTemplate = (f: TextField) => Template;

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
    onChange(e: TextChangedEvent): void

}

/**
 * TextChangedEvent 
 */
export class TextChangedEvent extends Event<string> { }

/**
 * TextField provides a wrapped native text input control.
 */
export class TextField extends GenericFormControl<string, TextFieldAttrs> {

    view: View = new views.Main(this);

    get = () => input(this).map(e => e.value).get();

    set = (v: string) => input(this).map(e => { e.value = v; return this; }).get();

    values = {

        root: {

            id: 'root',
            class: concat('form-group', this.attrs.ww.class, selectState(this.attrs.ww))

        },
        help: {

            id: 'message',
            success: this.attrs.ww.success,
            error: this.attrs.ww.error,
            warning: this.attrs.ww.warning

        },
        label: {

            id: this.attrs.ww.name,
            text: this.attrs.ww.label || ''

        },
        control: {

            id: 'control',
            template: (): TextFieldTemplate => this.attrs.ww.controlTemplate || views.group,
            class: concat(TEXT_FIELD, this.attrs.ww.class),
            name: this.attrs.ww.name,
            type: this.attrs.ww.type || 'text',
            focus: this.attrs.ww.focus,
            placeholder: this.attrs.ww.placeholder || '',
            value: this.attrs.ww.value || '',
            disabled: (this.attrs.ww.disabled === true) ? true : null,
            readOnly: (this.attrs.ww.readOnly === true) ? true : null,
            rows: this.attrs.ww.rows || 1,
            oninput: this.attrs.ww.onChange ? oninput(this) : () => { }

        }

    };


}
