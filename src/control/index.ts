/**
 * This module provides the parent interfaces for most of the
 * widgets considered 'controls'.
 *
 * Controls allow users to manipulate the state of an application
 * by interacting with widgets on screen. In simpler terms,
 * they are the widgets that accept user input or trigger
 * reactions when the user manipulates them.
 *
 * Generally, we use a streaming based workflow, that is
 * as the user preforms a supported action and event is generated
 * each and every time and some handler is applied to the event.
 */
/** @imports */
import { Component } from '@quenk/wml';
import { Maybe, just, nothing } from '@quenk/noni/lib/data/maybe';

import { HTMLElementAttrs } from '../';

///classNames:begin
export const CONTROL_WRAPPER = 'ww-control-wrapper';
///classNames:end

/**
 * Name of a control element used to associate its value to a key.
 */
export type Name = string;

/**
 * ControlAttrs
 */
export interface ControlAttrs<V> extends HTMLElementAttrs {
    /**
     * name of the control.
     *
     * Used by controls to tag events with names.
     */
    name?: Name;

    /**
     * value of the control.
     *
     * Used to intialize controls and may also be the
     * value of an Event.
     */
    value?: V;

    /**
     * disabled indicates the control should not be interactable.
     */
    disabled?: boolean;
}

/**
 * Control
 */
export interface Control<V, A extends ControlAttrs<V>> extends Component<A> {}

/**
 * Event is the parent class of all events generated by controls.
 */
export class Event<V> {
    constructor(
        public name: string,
        public value: V
    ) {}
}

/**
 * AbstractControl implements the methods of the Control interface.
 */
export abstract class AbstractControl<V, A extends ControlAttrs<V>>
    extends Component<A>
    implements Control<V, A> {}

/**
 * getName
 */
export const getName = <V>(attrs: ControlAttrs<V>) =>
    attrs && attrs.name ? attrs.name : '';

/**
 * getDisabled
 */
export const getDisabled = <V>(attrs: ControlAttrs<V>) =>
    attrs && attrs.disabled ? attrs.disabled : <boolean>(<any>undefined);

/**
 * getValue
 */
export const getValue = <V>(attrs: ControlAttrs<V>): Maybe<V> =>
    attrs && attrs.value ? just(attrs.value) : nothing();
