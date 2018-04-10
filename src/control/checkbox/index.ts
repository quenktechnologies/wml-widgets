import { View } from '@quenk/wml';
import { Main } from './wml/checkbox';
import { ControlAttrs, GenericControl, Event } from '../';

///classNames:begin
export const CHECKBOX = 'ww-checkbox';
///classNames:end

/**
 * CheckboxAttrs
 */
export interface CheckboxAttrs extends ControlAttrs<boolean> {

    /**
     * disabled checkbox.
     */
    disabled?: boolean,

    /**
     * onChange handler.
     */
    onChange?: (e: CheckChangedEvent) => void

}

/**
 * CheckChangedEvent signals the user has changed the checkbox state.
 */
export class CheckChangedEvent extends Event<boolean> { }

/**
 * Checkbox control.
 *
 * This is an alternative to the native checkbox that can be styled.
 */
export class Checkbox extends GenericControl<boolean, CheckboxAttrs> {

    view: View = new Main(this);

    values = {

        root: {

            class: CHECKBOX,

        },
        input: {

            name: this.attrs.ww.name,
            value: this.attrs.ww.value || null,
            onChange: () => {

                this.values.input.value = (!this.values.input.value) || null;

                if (this.attrs.ww.onChange)
                    this.attrs.ww.onChange(
                        new CheckChangedEvent(
                            this.values.input.name,
                            this.values.input.value || false));

            }
        }

    };

}

