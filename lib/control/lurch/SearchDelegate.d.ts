import { Delegate } from '@package/self/control';
import { TermChangedEvent } from './TermChangedEvent';
import { ItemSelectedEvent } from './ItemSelectedEvent';
/**
 * SearchDelegate allows for the interception of Search events.
 */
export interface SearchDelegate<V> extends Delegate<V> {
    /**
     * onSearch is used by Searchs to indicate the user is
     * typing in search terms.
     */
    onSearch: (e: TermChangedEvent) => void;
    /**
     * onSelect is called when the user selects an item from the search results.
     */
    onSelect: (e: ItemSelectedEvent<V>) => void;
}
