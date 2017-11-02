import { FormControlWWAttrs } from '@package/self/control';
import { Option } from './Option';
export interface ButtonSelectGroupWWAttrs<V, OV> extends FormControlWWAttrs<V> {
    options: Option<OV>[];
    variant?: string;
}
