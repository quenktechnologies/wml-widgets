import { Component, Attrs, View } from '@quenk/wml';
import { CheckboxChangedEvent } from './CheckboxChangedEvent';
export interface CheckboxAttrs extends Attrs {
    ww: {
        name: string;
        checked?: boolean;
        disabled?: boolean;
        onChange?: (e: CheckboxChangedEvent) => void;
    };
}
/**
 * Checkbox control.
 *
 * This is an alternative to the native checkbox that can be styled.
 */
export declare class Checkbox extends Component<CheckboxAttrs> {
    view: View;
    values: {
        class: {
            root: string;
        };
        input: {
            name: string;
            checked: boolean;
            onChange: () => void;
        };
    };
}
