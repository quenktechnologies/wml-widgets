import { Search } from './Search';
import { TermChangedEvent } from './TermChangedEvent';
import { EscapeEvent } from './EscapeEvent';
import { ResultSelectedEvent } from './ResultSelectedEvent';

/**
 * DefaultSearchDelegate is used when the user does not specify a delegate.
 */
export class DefaultSearchDelegate<A> {

    constructor(public search: Search<A>) { }

    onChange(e: TermChangedEvent): void {

        this.search.attrs.ww.onChange ?
            this.search.attrs.ww.onChange(e) : null;

    }

    onEscape(e: EscapeEvent): void {

        this.search.attrs.ww.onEscape ?
            this.search.attrs.ww.onEscape(e) : null;

    }

    onSelect(e: ResultSelectedEvent<A>): void {

        this.search.attrs.ww.onSelect ?
            this.search.attrs.ww.onSelect(e) : null;

    }

}
