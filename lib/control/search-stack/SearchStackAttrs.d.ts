import * as wml from '@quenk/wml';
import { SearchStackWWAttrs } from './SearchStackWWAttrs';
export interface SearchStackAttrs<V> extends wml.Attrs {
    ww: SearchStackWWAttrs<V>;
}
