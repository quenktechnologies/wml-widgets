import * as views from './wml/select';
import * as wml from '@quenk/wml';
import { concat } from '../../common/util';
import { FormControlWidget } from '../../control/form-control';
import { state } from '../../control/feedback-control';
import { SelectAttrs, Option } from '.';
import { SelectionChangedEvent } from './SelectionChangedEvent';

/**
 * Select provides a dropdown list for selecting items.
 *
 * Note: Currently this relies on the native select but this 
 * is likely to change in the future. Use the native <select>
 * directly if you must have that.
 */
export class Select extends FormControlWidget<string, SelectAttrs> {

    view: wml.View = new views.Main(this);

    values = {

        root: {

            id: 'root',
            class: concat('form-group', this.attrs.ww.class, state(this.attrs.ww))
        },

        label: {

            id: this.attrs.ww.name,
            text: this.attrs.ww.label || ''

        },

        select: {
            id: 'select',
            name: this.attrs.ww.name,
            class: 'form-control',
            value: this.attrs.ww.value || '',
            disabled: (this.attrs.ww.disabled === true) ? true : null,
            readOnly: (this.attrs.ww.readOnly === true) ? true : null,
            options: this.attrs.ww.options || [],
            placeholder: this.attrs.ww.placeholder || 'Select one.',
            optValue: (o: Option) => typeof o === 'string' ? o : o.value,
            optLabel: (o: Option) => typeof o === 'string' ? o : o.label,
            isSelected: (s: string) => this.values.select.value === s,
            onChange: (e: Event) => {

                let target = (<HTMLInputElement>e.target);

                this
                    .delegate
                    .onChange(
                    new SelectionChangedEvent(this.attrs.ww.name, target.value));

            }
        },
        help: {

            id: 'message',
            success: this.attrs.ww.success,
            error: this.attrs.ww.error,
            warning: this.attrs.ww.warning

        }
    };

    value(): string {

        return this.view.findById(this.values.select.id).cata(() => '', (e: HTMLInputElement) => e.value);

    }

}
