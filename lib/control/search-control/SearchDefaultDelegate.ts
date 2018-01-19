import { DefaultDelegate } from '@package/self/control';
import { TermChangedEvent } from './TermChangedEvent';
import { SearchDefaultDelegateAttrs } from './SearchDefaultDelegateAttrs';

/**
 * SearchDefaultDelegate fowards all events to their corresponding
 * function handlers, specifed on the attributes of a control.
 */
export class SearchDefaultDelegate<V> extends DefaultDelegate<V> {

    constructor(public attrs: SearchDefaultDelegateAttrs<V>) { super(attrs); }

    onSearch = (e: TermChangedEvent): void => {
        if (this.attrs.onSearch) this.attrs.onSearch(e);
    };

}