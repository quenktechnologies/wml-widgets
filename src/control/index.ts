import { Component } from '@quenk/wml';
import { WidgetAttrs, StylableAttrs } from '../';

/**
 * @module control
 *
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
 *
 */

/**
 * ControlAttrs
 */
export interface ControlAttrs<V> extends StylableAttrs {

    /**
     * name of the control.
     *
     * Used by controls to tag events with names.
     */
    name?: string,

    /**
     * value of the control.
     *
     * Used to intialize controls and may also be the
     * value of an Event.
     */
    value?: V,

    /**
     * disabled indicates the control should not be interactable.
     */
    disabled?: boolean

}

/**
 * Control 
 */
export interface Control<V, A extends ControlAttrs<V>>
    extends Component<WidgetAttrs<A>> { }

/**
 * Event is the parent class of all events generated by controls.
 */
export class Event<V> {

    constructor(public name: string, public value: V) { }

}

/**
 * GenericControl implements the methods of the Control interface.
 */
export abstract class GenericControl<V, A extends ControlAttrs<V>>
    extends Component<WidgetAttrs<A>>
    implements Control<V, A> { }
