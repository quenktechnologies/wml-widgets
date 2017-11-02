import { Delegate } from './Delegate';
import { Event } from './Event';
import {DefaultDelegateAttrs} from './DefaultDelegateAttrs';

/**
 * DefaultDelegate fowards all events to their corresponding
 * function handlers, specifed on the attributes of a control.
 */
export class DefaultDelegate<A> implements Delegate<A> {

    constructor(public attrs: DefaultDelegateAttrs<A>) { }

    onInput = (e: Event<A>): void =>
        this.attrs.onInput ? this.attrs.onInput(e) : null;

    onChange = (e: Event<A>): void =>
        this.attrs.onChange ? this.attrs.onChange(e) : null;

}
