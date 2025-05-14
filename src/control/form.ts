/**
 * The form module deals with controls specifically for accepting user input.
 */

/** imports */
import { View } from '@quenk/wml';

import { getById } from '../util';
import {
    FeedbackControlAttrs,
    FeedbackControl,
    AbstractFeedbackControl,
    Message
} from './feedback';
import { Help } from './help';

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
export interface FormControl<V, A extends FormControlAttrs<V>>
    extends FeedbackControl<V, A> {}

/**
 * AbstractFormControl provides a base implementation of a
 * FormControl.
 */
export abstract class AbstractFormControl<
    V,
    A extends FormControlAttrs<V>
> extends AbstractFeedbackControl<V, A> {}

/**
 * getLabel extracts the label value from FromControlAttrs.
 */
export const getLabel = <V>(attrs: FormControlAttrs<V>): string =>
    attrs && attrs.label ? attrs.label : '';

/**
 * setMessage helper.
 *
 * Sets the message on the Help widget.
 */
export const setMessage = (view: View, id: string, msg: Message) => {
    getById<Help>(view, id).map(h => {
        h.setMessage(msg);
    });
};

/**
 * removeMessage helper.
 *
 * Removes the message from the Help widget.
 */
export const removeMessage = (view: View, id: string) => {
    getById<Help>(view, id).map(h => {
        h.removeMessage();
    });
};
