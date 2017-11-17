import { Delegate } from '.';
import { Event } from './Event';
import { DefaultDelegateAttrs } from './DefaultDelegateAttrs';

/**
 * DefaultDelegate fowards all events to their corresponding
 * function handlers, specifed on the attributes of a control.
 */
export class DefaultDelegate<A> implements Delegate<A> {

    constructor(public attrs: DefaultDelegateAttrs<A>) { }

    onClick = (e: Event<A>): void =>
        this.attrs.onClick ? this.attrs.onClick(e) : null;

    onChange = (e: Event<A>): void =>
        this.attrs.onChange ? this.attrs.onChange(e) : null;

    onSelect = (e: Event<A>): void =>
        this.attrs.onSelect ? this.attrs.onSelect(e) : null;

}
