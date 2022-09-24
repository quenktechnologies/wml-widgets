/**
 * The form module deals with controls specifically for accepting user input.
 */
/** imports */
import { View } from '@quenk/wml';
import { FeedbackControlAttrs, FeedbackControl, AbstractFeedbackControl, Message } from './feedback';
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
}
/**
 * AbstractFormControl provides a base implementation of a
 * FormControl.
 */
export declare abstract class AbstractFormControl<V, A extends FormControlAttrs<V>> extends AbstractFeedbackControl<V, A> {
}
/**
 * getLabel extracts the label value from FromControlAttrs.
 */
export declare const getLabel: <V>(attrs: FormControlAttrs<V>) => string;
/**
 * setMessage helper.
 *
 * Sets the message on the Help widget.
 */
export declare const setMessage: (view: View, id: string, msg: Message) => void;
/**
 * removeMessage helper.
 *
 * Removes the message from the Help widget.
 */
export declare const removeMessage: (view: View, id: string) => void;
