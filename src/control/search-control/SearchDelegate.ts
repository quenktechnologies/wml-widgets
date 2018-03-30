import { Delegate } from '../../control';
import { TermChangedEvent } from './TermChangedEvent';

/**
 * SearchDelegate allows for the interception of Search events.
 */
export interface SearchDelegate<V> extends Delegate<V> {

    /**
     * onSearch is used by Searchs to indicate the user is 
     * typing in search terms.
     */
    onSearch: (e: TermChangedEvent) => void;

}

