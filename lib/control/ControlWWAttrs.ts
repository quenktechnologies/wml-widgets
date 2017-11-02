import { Event } from './Event';
import { Delegate } from './Delegate';

/**
 * ControlWWAttrs 
 */
export interface ControlWWAttrs<V> {

    /**
     * name of the control.
     */
    name: string,

    /**
     * value the control is initialized to.
     */
    value?: V,

    /**
     * class allows for additional styles to be applied to the root of the control's view.
     */
    class?: string,

    /**
    * disabled disables controls that support it.
    */
    disabled?: boolean,

    /**
     * delegate that all supported control events will be sent to.
     */
    delegate?: Delegate<V>

    /**
     * onInput handler.
     */
    onInput?: (e: Event<V>) => void,

    /**
     * onChange handler.
     */
    onChange?: (e: Event<V>) => void

}
