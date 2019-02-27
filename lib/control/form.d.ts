/**
 * The form module deals with controls specifically for accepting user input.
 */
/** imports */
import { FeedbackControlAttrs, FeedbackControl, AbstractFeedbackControl } from './feedback';
/**
 * FormControlAtrrs
 */
export interface FormControlAttrs<V> extends FeedbackControlAttrs<V> {
    /**
     * label for the control.
     */
    label?: string;
}
/**
 * FormControl generates events based on user input.
 */
export interface FormControl<V, A extends FormControlAttrs<V>> extends FeedbackControl<V, A> {
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
 * AbstractFormControl provides a base implementation of a
 * FormControl.
 */
export declare abstract class AbstractFormControl<V, A extends FormControlAttrs<V>> extends AbstractFeedbackControl<V, A> {
}
