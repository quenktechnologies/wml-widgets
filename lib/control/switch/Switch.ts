import * as names from '@package/wml-widgets/common/names';
import { Component, Attrs, View } from '@quenk/wml';
import { Main } from './wml/switch';
import { SwitchChangedEvent } from './SwitchChangedEvent';

export interface SwitchAttrs extends Attrs {

    ww: {

        name: string,
        on?: boolean,
        disabled?: boolean,
        onChange?: (e: SwitchChangedEvent) => void

    }

}

/**
 * Switch allows the user to select between one or two values.
 */
export class Switch extends Component<SwitchAttrs> {

    view: View = new Main(this);

    values = {

        class: {

            label: names.SWITCH,
            slider: names.SWITCH_SLIDER

        },
        input: {

            name: this.attrs.ww.name,
            on: this.attrs.ww.on || false,
            disabled: this.attrs.ww.disabled ? true : null,
            onChange: () => {

                this.values.input.on = !this.values.input.on;

                if (this.attrs.ww.onChange)
                    this.attrs.ww.onChange(
                        new SwitchChangedEvent(
                            this.values.input.name,
                            this.values.input.on));

            }
        }

    };

}

