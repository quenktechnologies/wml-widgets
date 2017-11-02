import { Event } from './Event';
/**
 * Delegate allows for the interception of all supported control events.
 */
export interface Delegate<V> {
    /**
     * onInput usually indicates the user has entered some value.
     */
    onInput: (e: Event<V>) => void;
    /**
     * onChange indicates that the value of a control has changed
     * due to some user activity.
     */
    onChange: (e: Event<V>) => void;
}
