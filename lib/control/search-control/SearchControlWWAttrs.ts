import { FormControlWWAttrs } from '../../control/form-control';
import { TermChangedEvent } from './TermChangedEvent';
import { SearchDelegate } from './SearchDelegate';

/**
 * SearchControlWWAttrs
 */
export interface SearchControlWWAttrs<V> extends FormControlWWAttrs<V> {

    delegate?: SearchDelegate<V>,

    /**
     * debounce is the length of time to debounce keyboard events.
     *
     * Set to 0 to disable debouncing.
     */
    debounce?: number,

    /**
     * stringifier function for getting the text value of 
     * a result item when using the default populated template.
     */
    stringifier?: (r: V) => string,

    /**
     * onSearch handler.
     */
    onSearch?: (e: TermChangedEvent) => void

}


