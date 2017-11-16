import * as wml from '@quenk/wml';
import * as views from './wml/text-field';
import { concat } from '@package/self/common/util';
import { TextFieldValues } from '.';
import { FormControl } from '@package/self/control';
import { TextFieldAttrs } from './TextFieldAttrs';
import { TextChangedEvent } from './TextChangedEvent';

/**
 * TextField
 */
export class TextField extends FormControl<string, TextFieldAttrs> {

    view: wml.View = new views.Main(this);

    values: TextFieldValues = {

        root: {

            id: 'root',
            class: concat('form-group', this.attrs.ww.class, this.state())

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
            template: this.attrs.ww.control || views.group,
            class: 'form-control',
            name: this.attrs.ww.name,
            type: this.attrs.ww.type || 'text',
            focus: this.attrs.ww.focus,
            placeholder: this.attrs.ww.placeholder || '',
            value: this.attrs.ww.value || '',
            disabled: (this.attrs.ww.disabled === true) ? true : null,
            readOnly: (this.attrs.ww.readOnly === true) ? true : null,
            rows: this.attrs.ww.rows || 1,
            oninput: (e: KeyboardEvent) => this.delegate.onChange(
                new TextChangedEvent(this.attrs.ww.name, (<HTMLInputElement>e.target).value))
        }
    };

}
