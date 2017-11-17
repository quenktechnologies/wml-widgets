import * as wml from '@quenk/wml';
import { SearchControlWWAttrs } from './SearchControlWWAttrs';

export interface SearchControlAttrs<V> extends wml.Attrs {

    ww: SearchControlWWAttrs<V>

}
