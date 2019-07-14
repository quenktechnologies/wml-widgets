/**
 * The form module deals with controls specifically for accepting user input.
 */

/** imports */
import { WidgetAttrs } from '../';
import { getById } from '../util';
import {
    FeedbackControlAttrs,
    FeedbackControl,
    AbstractFeedbackControl,
    Message
} from './feedback';
import { Help } from './help';
import { View } from '@quenk/wml';

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
    extends FeedbackControl<V, A> { }

/**
 * AbstractFormControl provides a base implementation of a
 * FormControl.
 */
export abstract class AbstractFormControl<V, A extends FormControlAttrs<V>>
    extends AbstractFeedbackControl<V, A> { }

/**
 * getLabel extracts the label value from FromControlAttrs.
 */
export const getLabel = <V>(attrs: WidgetAttrs<FormControlAttrs<V>>)
    : string => (attrs.ww && attrs.ww.label) ? attrs.ww.label : '';

/**
 * setMessage helper.
 *
 * Sets the message on the Help widget.
 */
export const setMessage = (view: View, id: string, msg: Message) => {

    getById<Help>(view, id).map(h => { h.setMessage(msg) });

}

/**
 * removeMessage helper.
 *
 * Removes the message from the Help widget.
 */
export const removeMessage = (view: View, id: string) => {

    getById<Help>(view, id).map(h => { h.removeMessage() });

}
