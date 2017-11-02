import { Event } from './Event';
/**
 * DefaultDelegateAttrs are the callbacks the DefaultDelegate will adapt to.
 */
export interface DefaultDelegateAttrs<V> {
    /**
     * onInput handler.
     */
    onInput?: (e: Event<V>) => void;
    /**
     * onChange handler.
     */
    onChange?: (e: Event<V>) => void;
}
