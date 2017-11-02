import * as wml from '@quenk/wml';
import { StackWWAttrs } from './StackWWAttrs';
export interface StackAttrs<M> extends wml.Attrs {
    ww: StackWWAttrs<M>;
}
