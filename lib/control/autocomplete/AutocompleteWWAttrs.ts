import { SearchWWAttrs, PopulatedFun, EmptyFun } from '@package/self/control/lurch';

export interface AutocompleteWWAttrs<V> extends SearchWWAttrs<V> {

    /**
     * populated template for rendering each search result item.
     */
    populated?: PopulatedFun,

    /**
     * empty template for rendering the lack of search results.
     */
    empty?: EmptyFun,

    /**
      * inputClass is the class list for the input.
      */
    inputClass?: string,

    /**
     * placeholder text for the input.
     */
    placeholder?: string,


}
