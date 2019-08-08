import { View } from '@quenk/wml';
import { concat } from '../../util';
import { getId, getClassName } from '../../';
import { ControlAttrs, AbstractControl, Event, getName, getDisabled } from '../';
import { Main } from './wml/switch';

///classNames:begin
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
export class Switch extends AbstractControl<boolean, SwitchAttrs> {

    view: View = new Main(this);

    values = {

        root: {

            id: getId(this.attrs),

            className: concat(SWITCH, getClassName(this.attrs))

        },
        slider: {

            className: SWITCH_SLIDER

        },
        input: {

            name: getName(this.attrs),

            value: (this.attrs.ww && this.attrs.ww.value) ?
                this.attrs.ww.value : false,

            checked: () => this.values.input.value ? true : undefined,

            disabled: getDisabled(this.attrs),

            onChange: () => {

                this.values.input.value = (!this.values.input.value)

                if ((this.attrs.ww && this.attrs.ww.onChange))
                    this.attrs.ww.onChange(new SwitchChangedEvent(
                        this.values.input.name,
                        this.values.input.value));

            }
        }

    };

}

