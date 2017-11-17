import { Delegate } from '.';
import { Event } from './Event';
import { DefaultDelegateAttrs } from './DefaultDelegateAttrs';
/**
 * DefaultDelegate fowards all events to their corresponding
 * function handlers, specifed on the attributes of a control.
 */
export declare class DefaultDelegate<A> implements Delegate<A> {
    attrs: DefaultDelegateAttrs<A>;
    constructor(attrs: DefaultDelegateAttrs<A>);
    onClick: (e: Event<A>) => void;
    onChange: (e: Event<A>) => void;
    onSelect: (e: Event<A>) => void;
}
