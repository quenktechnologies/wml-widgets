import { FormControlWWAttrs } from '@package/wml-widgets/control/form-control';
import { Option } from './Option';
export interface ButtonSelectGroupWWAttrs<V, OV> extends FormControlWWAttrs<V> {
    /**
     * options to display
     */
    options: Option<OV>[];
    /**
     * variant in style to use.
     */
    variant?: string;
}
