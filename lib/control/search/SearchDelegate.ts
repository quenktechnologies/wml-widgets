import { TermChangedEvent } from './TermChangedEvent';
import { EscapeEvent } from './EscapeEvent';
import {ResultSelectedEvent} from './ResultSelectedEvent';

/**
 * SearchDelegate describes an api for any class that is interested
 * in intercepting all the events of the Search.
 */
export interface SearchDelegate<A> {

    /**
     * onChange is called when the search term changes.
     */
    onChange(e: TermChangedEvent): void;

    /**
     * onEscape is called when the escape key is pressed.
     */
    onEscape(e: EscapeEvent): void;

  /**
   * onSelect is called when the user selects a result item.
   */
  onSelect(e: ResultSelectedEvent<A>) : void;

}
