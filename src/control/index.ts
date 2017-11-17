import * as wml from '@quenk/wml';
import { Event } from './Event';

export { Event };
export { DefaultDelegate } from './DefaultDelegate';
export { DefaultDelegateAttrs } from './DefaultDelegateAttrs';

/**
 * Control 
 */
export interface Control<A extends wml.Attrs> extends wml.Component<A> {}

/**
 * ControlWWAttrs 
 */
export interface ControlWWAttrs {

    /**
     * name of the control.
     */
    name: string,

    /**
     * class allows for additional styles to be applied to the root of the control's view.
     */
    class?: string,

    /**
    * disabled disables controls that support it.
    */
    disabled?: boolean,

}

/**
 * Delegate allows for the interception of all supported control events.
 */
export interface Delegate<V> {

    /**
     * onChange handler.
     */
    onChange?: (e: Event<V>) => void

    /**
    * onClick handler.
    */
    onClick?: (e: Event<V>) => void,

    /**
     * onSelect handler.
     */
    onSelect?: (e: Event<V>) => void

}

