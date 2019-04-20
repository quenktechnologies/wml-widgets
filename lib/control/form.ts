/**
 * The form module deals with controls specifically for accepting user input.
 */

/** imports */
import {
    FeedbackControlAttrs,
    FeedbackControl,
    AbstractFeedbackControl
} from './feedback';

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
    extends FeedbackControl<V, A> {

}

/**
 * AbstractFormControl provides a base implementation of a
 * FormControl.
 */
export abstract class AbstractFormControl<V, A extends FormControlAttrs<V>>
    extends AbstractFeedbackControl<V, A> { }
