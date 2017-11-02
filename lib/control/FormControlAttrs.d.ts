import * as wml from '@quenk/wml';
import { FormControlWWAttrs } from './FormControlWWAttrs';
export interface FormControlAttrs<V> extends wml.Attrs {
    ww: FormControlWWAttrs<V>;
}
