import { View } from '@quenk/wml';
import { ControlAttrs, GenericControl, Event } from '../../control';
import { Main } from './wml/switch';

///className:begin
export const SWITCH = 'ww-switch';
export const SWITCH_SLIDER = 'ww-switch__slider';
///classNames:end

/**
 * SwitchAttrs
 */
export interface SwitchAttrs extends ControlAttrs<boolean> {

    /**
     * onChange handler
     */
    onChange?: (e: SwitchChangedEvent) => void

}

/**
 * SwitchChangedEvent signals the user has changed the switch.
 */
export class SwitchChangedEvent extends Event<boolean> { }

/**
 * Switch allows the user to select between one or two values.
 */
export class Switch extends GenericControl<boolean, SwitchAttrs> {

    view: View = new Main(this);

    values = {

        class: {

            label: SWITCH,
            slider: SWITCH_SLIDER

        },
        input: {

            name: this.attrs.ww.name,
            value: this.attrs.ww.value || false,
            disabled: this.attrs.ww.disabled ? true : null,
            onChange: () => {

                this.values.input.value = !this.values.input.value;

                if (this.attrs.ww.onChange)
                    this.attrs.ww.onChange(
                        new SwitchChangedEvent(
                            this.values.input.name,
                            this.values.input.value));

            }
        }

    };

}

