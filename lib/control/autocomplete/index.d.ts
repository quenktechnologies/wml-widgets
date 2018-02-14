import * as wml from '@quenk/wml';
import { SearchControlWWAttrs, PopulatedFun, EmptyFun } from '@package/wml-widgets/control/search-control';
export { Autocomplete } from './Autocomplete';
export { ItemSelectedEvent, TermChangedEvent } from '@package/wml-widgets/control/search-control';
export interface AutocompleteAttrs<V> extends wml.Attrs {
    ww: AutocompleteWWAttrs<V>;
}
export interface AutocompleteWWAttrs<V> extends SearchControlWWAttrs<V> {
    /**
     * populated template for rendering each search result item.
     */
    populated?: PopulatedFun<V>;
    /**
     * empty template for rendering the lack of search results.
     */
    empty?: EmptyFun<V>;
    /**
      * inputClass is the class list for the input.
      */
    inputClass?: string;
    /**
     * placeholder text for the input.
     */
    placeholder?: string;
}
