import { DefaultDelegate } from '@package/wml-widgets/control';
import { TermChangedEvent } from './TermChangedEvent';
import { SearchDefaultDelegateAttrs } from './SearchDefaultDelegateAttrs';
/**
 * SearchDefaultDelegate fowards all events to their corresponding
 * function handlers, specifed on the attributes of a control.
 */
export declare class SearchDefaultDelegate<V> extends DefaultDelegate<V> {
    attrs: SearchDefaultDelegateAttrs<V>;
    constructor(attrs: SearchDefaultDelegateAttrs<V>);
    onSearch: (e: TermChangedEvent) => void;
}
