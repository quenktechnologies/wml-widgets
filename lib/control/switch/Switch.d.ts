import { Component, Attrs, View } from '@quenk/wml';
import { SwitchChangedEvent } from './SwitchChangedEvent';
export interface SwitchAttrs extends Attrs {
    ww: {
        name: string;
        on?: boolean;
        disabled?: boolean;
        onChange?: (e: SwitchChangedEvent) => void;
    };
}
/**
 * Switch allows the user to select between one or two values.
 */
export declare class Switch extends Component<SwitchAttrs> {
    view: View;
    values: {
        class: {
            label: string;
            slider: string;
        };
        input: {
            name: string;
            on: boolean;
            disabled: boolean;
            onChange: () => void;
        };
    };
}
