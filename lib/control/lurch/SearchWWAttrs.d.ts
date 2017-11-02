import { FormControlWWAttrs } from '@package/self/control';
import { TermChangedEvent } from './TermChangedEvent';
import { ItemSelectedEvent } from './ItemSelectedEvent';
import { SearchDelegate } from './SearchDelegate';
/**
 * SearchWWAttrs
 */
export interface SearchWWAttrs<V> extends FormControlWWAttrs<V> {
    delegate?: SearchDelegate<V>;
    /**
     * debounce is the length of time to debounce keyboard events.
     *
     * Set to 0 to disable debouncing.
     */
    debounce?: number;
    /**
     * stringifier function for getting the text value of
     * a result item when using the default populated template.
     */
    stringifier?: (r: V) => string;
    /**
     * onSearch handler.
     */
    onSearch?: (e: TermChangedEvent) => void;
    /**
     * onSelect handler.
     */
    onSelect?: (e: ItemSelectedEvent<V>) => void;
}
