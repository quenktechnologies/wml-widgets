import { DefaultDelegateAttrs } from '@package/wml-widgets/control';
import { TermChangedEvent } from './TermChangedEvent';

/**
 * SearchDefaultDelegateAttrs are the callbacks the SearchDefaultDelegate will adapt to.
 */
export interface SearchDefaultDelegateAttrs<V> extends DefaultDelegateAttrs<V> {

    /**
     * onSearch handler.
     */
    onSearch?: (e: TermChangedEvent) => void

}
