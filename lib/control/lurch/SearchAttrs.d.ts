import * as wml from '@quenk/wml';
import { SearchWWAttrs } from './SearchWWAttrs';
export interface SearchAttrs<V> extends wml.Attrs {
    ww: SearchWWAttrs<V>;
}
