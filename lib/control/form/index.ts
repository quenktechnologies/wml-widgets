import {
    Control,
    ControlAttrs,
    ControlAttrsProperties
} from '../';

/**
 * @module control/form
 *
 * The form module provides controls that can be used for accepting user input.
 *
 * Widgets here are designed with 'streaming' in mind. That is, as the user
 * interacts with them, events are generated and applied to the relevant
 * user supplied functions.
 *
 * Each widget provides its own class of Events where feasible except for those 
 * where the interactions are mostly indistiguishable.
 */

/**
 * FormControlAttrsProperties
 */
export interface FormControlAttrsProperties<V> extends ControlAttrsProperties {

    /**
     * label for the control.
     */
    label?: string

    /**
     * value the control will be initilized with.
     */
    value?: V

}

/**
 * FormControlAttrs are common to most FormControl implementors.
 */
export interface FormControlAttrs<V> extends ControlAttrs {

    ww: FormControlAttrsProperties<V>;

}

/**
 * FormControl are those controls that typically relay user input via events.
 */
export interface FormControl<V, A extends ControlAttrs> extends Control<A> {

    /**
     * get provides the value of a FormControl
     */
    get(): V;

    /**
     * set the vallue of a FormControl
     */
    set(value: V): FormControl<V, A>;

}
