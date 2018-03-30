import * as names from '../../common/names';
import { Component, Attrs, View } from '@quenk/wml';
import { Main } from './wml/checkbox';
import { CheckboxChangedEvent } from './CheckboxChangedEvent';

export interface CheckboxAttrs extends Attrs {

    ww: {

        name: string,
        checked?: boolean,
        disabled?: boolean,
        onChange?: (e: CheckboxChangedEvent) => void

    }

}

/**
 * Checkbox control.
 *
 * This is an alternative to the native checkbox that can be styled.
 */
export class Checkbox extends Component<CheckboxAttrs> {

    view: View = new Main(this);

    values = {

        class: {

            root: names.CHECKBOX,

        },
        input: {

            name: this.attrs.ww.name,
            checked: this.attrs.ww.checked || false,
            onChange: () => {

                this.values.input.checked = !this.values.input.checked;

                if (this.attrs.ww.onChange)
                    this.attrs.ww.onChange(
                        new CheckboxChangedEvent(
                            this.values.input.name,
                            this.values.input.checked));

            }
        }

    };

}

