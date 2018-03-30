import * as wml from '@quenk/wml';
import { FormControlEvent } from './FormControlEvent';
import { Delegate } from '../../control';
import { FeedbackControlWWAttrs } from '../../control/feedback-control';
import { FeedbackControl } from '../../control/feedback-control';
export { FormControlEvent };
export { FormControlWidget } from './FormControlWidget';
export { FormControlWidgetValues } from './FormControlWidgetValues';
/**
 * FormControl are those controls that typically relay user input via events.
 */
export interface FormControl<V, A extends wml.Attrs> extends FeedbackControl<A> {
    /**
     * value provides the value of a FormControl
     */
    value(): V;
}
/**
 * FormControlAttrs are common to most FormControl implementors.
 */
export interface FormControlAttrs<V> extends wml.Attrs {
    ww: FormControlWWAttrs<V>;
}
/**
 * FormControlWWAttrs are the ww attributes common to all form controls.
 *
 * Some of these may be ignored by implementations.
 */
export interface FormControlWWAttrs<V> extends FeedbackControlWWAttrs {
    /**
     * value the control will be initilized with.
     */
    value?: V;
    /**
     * delegate can intercept supported events
     */
    delegate?: Delegate<V>;
    /**
     * label value to display for FormControls that support internal labels.
     */
    label?: string;
    /**
     * readOnly makes controls that support it readOnly.
     */
    readOnly?: boolean;
    /**
     * onChange handler.
     */
    onChange?: (e: FormControlEvent<V>) => void;
    /**
    * onClick handler.
    */
    onClick?: (e: FormControlEvent<V>) => void;
    /**
     * onSelect handler.
     */
    onSelect?: (e: FormControlEvent<V>) => void;
}
