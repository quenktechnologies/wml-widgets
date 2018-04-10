import { FeedbackControlAttrs, FeedbackControl, GenericFeedbackControl } from './feedback';

/**
 * Get
 */
export type Get<V> = () => V;

/**
 * Set
 */
export type Set<V, A extends FormControlAttrs<V>> = (val: V) => FormControl<V, A>;

/**
 * The form module deals with controls specifically for accepting user input.
 */

/**
 * FormControlAtrrs
 */
export interface FormControlAttrs<V> extends FeedbackControlAttrs<V> {

    /**
     * label for the control.
     */
    label?: string

}

/**
 * FormControl generates events based on user input.
 */
export interface FormControl<V, A extends FormControlAttrs<V>>
    extends  FeedbackControl<V, A> {

    /**
     * get provides the current value of a FormControlear;make
     */
    get(): V;

    /**
     * set the current value of a FormControl.
     */
    set(value: V): FormControl<V, A>;

}

/**
 * GenericFormControl provides a base implementation of a
 * FormControl.
 */
export abstract class GenericFormControl<V, A extends FormControlAttrs<V>>
    extends GenericFeedbackControl<V, A> {


}
