import * as wml from '@quenk/wml';
import { AutocompleteWWAttrs } from './AutocompleteWWAttrs';
export interface AutocompleteAttrs<V> extends wml.Attrs {
    ww: AutocompleteWWAttrs<V>;
}
