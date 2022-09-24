import { View } from '@quenk/wml';
import { Main } from './wml/checkbox';
import {concat} from '../../util';
import { ControlAttrs, AbstractControl, Event,getName } from '../';
import {getId, getClassName} from '../../';

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
export class Checkbox extends AbstractControl<boolean, CheckboxAttrs> {

    view: View = new Main(this);

    values = {

      root: {

          id: getId(this.attrs),

            className: concat(CHECKBOX,getClassName(this.attrs))

        },
        input: {

          name: getName(this.attrs),

          value: (this.attrs && this.attrs.value) ?
          this.attrs.value : null,

            onChange: () => {

                this.values.input.value = (!this.values.input.value) || null;

                if (this.attrs && this.attrs.onChange)
                    this.attrs.onChange(
                        new CheckChangedEvent(
                            this.values.input.name,
                            this.values.input.value || false));

            }
        }

    };

}

