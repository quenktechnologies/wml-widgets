import { Search } from './Search';
import { TermChangedEvent } from './TermChangedEvent';
import { EscapeEvent } from './EscapeEvent';
import { ResultSelectedEvent } from './ResultSelectedEvent';
/**
 * DefaultSearchDelegate is used when the user does not specify a delegate.
 */
export declare class DefaultSearchDelegate<A> {
    search: Search<A>;
    constructor(search: Search<A>);
    onChange(e: TermChangedEvent): void;
    onEscape(e: EscapeEvent): void;
    onSelect(e: ResultSelectedEvent<A>): void;
}
