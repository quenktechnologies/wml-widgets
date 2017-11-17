import { Event } from './Event';
/**
 * DefaultDelegateAttrs are the callbacks the DefaultDelegate will adapt to.
 */
export interface DefaultDelegateAttrs<V> {
    /**
     * onChange handler.
     */
    onChange?: (e: Event<V>) => void;
    /**
    * onClick handler.
    */
    onClick?: (e: Event<V>) => void;
    /**
     * onSelect handler.
     */
    onSelect?: (e: Event<V>) => void;
}
