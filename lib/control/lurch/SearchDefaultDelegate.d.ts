import { DefaultDelegate } from '@package/self/control';
import { TermChangedEvent } from './TermChangedEvent';
import { ItemSelectedEvent } from './ItemSelectedEvent';
import { SearchDefaultDelegateAttrs } from './SearchDefaultDelegateAttrs';
/**
 * SearchDefaultDelegate fowards all events to their corresponding
 * function handlers, specifed on the attributes of a control.
 */
export declare class SearchDefaultDelegate<V> extends DefaultDelegate<V> {
    attrs: SearchDefaultDelegateAttrs<V>;
    constructor(attrs: SearchDefaultDelegateAttrs<V>);
    onSearch: (e: TermChangedEvent) => void;
    onSelect: (e: ItemSelectedEvent<V>) => void;
}
