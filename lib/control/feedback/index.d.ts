import { View } from '@quenk/wml';
import { Control, ControlAttrs, ControlAttrsProperties } from '../../control';
/**
 * @module control/feedback
 */
export declare const NEUTRAL = 0;
export declare const ERROR = 1;
export declare const SUCCESS = 2;
export declare const WARNING = 3;
/**
 * FeedbackControlAttrsProperties are the ww attributes common to all FeedbackControls.
 *
 * Some of these may be ignored by implementations.
 */
export interface FeedbackControlAttrsProperties extends ControlAttrsProperties {
    /**
     * success allows the control to be intialized in the valid state with
     * a message.
     */
    success?: string;
    /**
     * error allows the control to be intialized in the invalid state with
     * a message.
     */
    error?: string;
    /**
     * warning allows the control to be intilalized in the warn state with
     * a message.
     */
    warning?: string;
}
/**
 * FeedbackControlAttrs
 */
export interface FeedbackControlAttrs extends ControlAttrs {
    ww: FeedbackControlAttrsProperties;
}
/**
 * FeedbackControl is a Control that provides visual hints as to
 * the validity of the value entered in the Control.
 */
export interface FeedbackControl<A extends FeedbackControlAttrs> extends Control<A> {
    /**
     * message sets a message on the control.
     */
    message(msg: string): FeedbackControl<A>;
    /**
     * success sets a success message on the FeedbackControl.
     */
    success(message: string): FeedbackControl<A>;
    /**
     * error sets an error message on the FeedbackControl.
     */
    error(message: string): FeedbackControl<A>;
    /**
     * warning sets a warning messages on the FeedbackControl.
     */
    warning(message: string): FeedbackControl<A>;
    /**
     * clear any validation state on the control.
     */
    clear(): FeedbackControl<A>;
}
export interface FeedbackControlWidget<A extends FeedbackControlAttrs> extends FeedbackControl<A> {
    /**
     * view of the FeedbackControl
     */
    view: View;
    /**
     * values used in the view.
     */
    values: {
        /**
         * root element values.
         */
        root: {
            /**
             * id of the root element.
             */
            id: string;
        };
        /**
         * messages element values.
         */
        messages: {
            /**
             * id of the messages element.
             */
            id: string;
        };
    };
}
/**
 * setState helper for changing the state of the displayed DOM.
 */
export declare const setState: <A extends FeedbackControlAttrs, C extends FeedbackControlWidget<A>>(c: C) => (state: string) => C;
/**
 * setSuccess helper.
 */
export declare const setSuccess: <A extends FeedbackControlAttrs, C extends FeedbackControlWidget<A>>(c: C) => () => C;
/**
 * setWarning helper.
 */
export declare const setWarning: <A extends FeedbackControlAttrs, C extends FeedbackControlWidget<A>>(c: C) => () => C;
/**
 * setError helper.
 */
export declare const setError: <A extends FeedbackControlAttrs, C extends FeedbackControlWidget<A>>(c: C) => () => C;
/**
 * setMessage helper for setting a message on a FeedbackControl.
 */
export declare const setMessage: <A extends FeedbackControlAttrs, C extends FeedbackControlWidget<A>>(c: C) => (msg: string) => C;
/**
 * clear validation states from a control.
 */
export declare const clear: <A extends FeedbackControlAttrs, C extends FeedbackControlWidget<A>>(c: C) => () => C;
/**
 * selectState from an attribute list.
 */
export declare const selectState: (attrs: {
    success?: string;
    error?: string;
    warning?: string;
}) => "" | "-success" | "-warning" | "-error";
